const Student = require("../models/Student");
const Interview = require("../models/Interview");
const Result = require("../models/Result");
const CourseScores = require("../models/CourseScores");

const { Parser } = require("json2csv");
const fs = require("fs");

// Controller to retrieve a list of students
module.exports.all = async (req, res) => {
    try {
        let students = await Student.find();
        for (let i = 0; i < students.length; i++) {
            let scores = await CourseScores.findOne({ student: students[i].id });
            if (scores) {
                students[i].dsaFinalScore = scores.dsaFinalScore;
                students[i].webDFinalScore = scores.webDFinalScore;
                students[i].reactFinalScore = scores.reactFinalScore;
            }
        }
        return res.render("students", {
            interviewId: "",
            students: students,
            path: req.originalUrl,
        });
    } catch (error) {
        return res.render("404", {
            error: {
                status: 500,
                message: error.message,
            },
        });
    }
};

// Controller to retrieve a list of students by Id
module.exports.allId = async (req, res) => {
    try {
        let interviewId = req.params.id;
        let interview = await Interview.findById(interviewId).populate("students");
        for (let i = 0; i < interview.students.length; i++) {
            let result = await Result.findOne({ student: interview.students[i].id, interview: interviewId });
            if (result) interview.students[i].result = result.result;
            let scores = await CourseScores.findOne({ student: interview.students[i].id });
            if (scores) {
                interview.students[i].dsaFinalScore = scores.dsaFinalScore;
                interview.students[i].webDFinalScore = scores.webDFinalScore;
                interview.students[i].reactFinalScore = scores.reactFinalScore;
            }
        }
        // console.log(interviewId);
        return res.render("students", {
            interviewId: interviewId,
            students: interview.students,
            path: req.originalUrl,
        });
    } catch (error) {
        return res.render("404", {
            error: {
                status: 501,
                message: error.message,
            },
        });
    }
};

// Controller to add a new student
module.exports.create = async (req, res) => {
    try {
        let student = await Student.findOne({ email: req.body.email });
        if (!student) student = await Student.create(req.body);
        return res.redirect(req.originalUrl);
    } catch (error) {
        return res.render("404", {
            error: {
                status: 502,
                message: error.message,
            },
        });
    }
};

// Controller to update a student
module.exports.update = async (req, res) => {
    try {
        let interviewId = req.params.id;
        let interview = await Interview.findById(interviewId);
        if (!interview) return res.status(401).json({ message: "Interview Not Found" });
        let student = await Student.findOne({ email: req.body.email });
        if (!student)
            student = await Student.create({
                name: req.body.name,
                collage: req.body.collage,
                email: req.body.email,
                status: req.body.status,
            });
        interview = await Interview.findByIdAndUpdate(interviewId, { $addToSet: { students: student.id } }, { new: true });
        student = await Student.findByIdAndUpdate(student.id, { $addToSet: { interviews: interviewId } }, { new: true });
        return res.redirect(req.originalUrl);
    } catch (error) {
        return res.render("404", {
            error: {
                status: 503,
                message: error.message,
            },
        });
    }
};

module.exports.updateScore = async (req, res) => {
    try {
        let interviewId = req.body.interviewId;
        interviewId = interviewId.substr(0, interviewId.length - 1);
        let studentId = req.params.id;
        if (interviewId) {
            let result = await Result.findOne({ student: studentId, interview: interviewId });
            if (!result) await Result.create({ student: studentId, interview: interviewId, result: req.body.result });
            else await Result.findByIdAndUpdate(result.id, { $set: { result: req.body.result } }, { new: true });
        }
        let scores = await CourseScores.findOne({ student: studentId });
        if (!scores)
            scores = await CourseScores.create({
                student: studentId,
                dsaFinalScore: req.body.dsaFinalScore,
                webDFinalScore: req.body.webDFinalScore,
                reactFinalScore: req.body.reactFinalScore,
            });
        else scores = await CourseScores.findByIdAndUpdate(scores.id, { $set: { dsaFinalScore: req.body.dsaFinalScore, webDFinalScore: req.body.webDFinalScore, reactFinalScore: req.body.reactFinalScore } }, { new: true });
        let student = await Student.findByIdAndUpdate(
            studentId,
            {
                $set: {
                    name: req.body.name,
                    collage: req.body.collage,
                    status: req.body.status,
                },
            },
            { new: true }
        );
        return res.redirect(`/students/${interviewId}`);
    } catch (error) {
        return res.render("404", {
            error: {
                status: 504,
                message: error.message,
            },
        });
    }
};

module.exports.studentData = async (req, res) => {
    try {
        let studentId = req.params.id;
        let student = await Student.findById(studentId).populate("interviews");
        let scores = await CourseScores.findOne({ student: studentId });
        let data = [];
        if (student.interviews.length < 1) {
            data.push({
                id: studentId,
                name: student.name,
                collage: student.collage,
                status: student.status,
                dsaFinalScore: scores ? scores.dsaFinalScore : "Not Define",
                webDFinalScore: scores ? scores.webDFinalScore : "Not Define",
                reactFinalScore: scores ? scores.reactFinalScore : "Not Define",
            });
            console.log("Interview Not Given");
        }
        for (let i = 0; i < student.interviews.length; i++) {
            let result = await Result.findOne({ student: studentId, interview: student.interviews[i].id });
            data.push({
                id: studentId,
                name: student.name,
                collage: student.collage,
                status: student.status,
                dsaFinalScore: scores ? scores.dsaFinalScore : "Not Define",
                webDFinalScore: scores ? scores.webDFinalScore : "Not Define",
                reactFinalScore: scores ? scores.reactFinalScore : "Not Define",
                date: student.interviews[i].date,
                company: student.interviews[i].company,
                result: result ? result.result : "Not Yet Interviewed",
            });
        }
        let parser = new Parser();
        let csv = parser.parse(data);
        fs.writeFile(`${student.name}.csv`, csv, (err) => {
            if (err) console.log(err.message);
            else console.log("File Saved");
        });
        res.attachment(`${student.name}.csv`);
        return res.status(200).send(data);
    } catch (error) {
        return res.render("404", {
            error: {
                status: 504,
                message: error.message,
            },
        });
    }
};

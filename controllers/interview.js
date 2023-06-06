const { model } = require("mongoose");
const Interview = require("../models/Interview");
const Student = require("../models/Student");

// Controller to fetch the list of interviews
module.exports.all = async (req, res) => {
    try {
        let interviews = await Interview.find();
        return res.render("interviews", {
            interviews: interviews,
            path: req.originalUrl,
        });
    } catch (error) {
        return res.render("404", {
            error: {
                status: 510,
                message: error.message,
            },
        });
    }
};

// Controller to retrieve a list of interview by Id
module.exports.allId = async (req, res) => {
    try {
        let studentId = req.params.id;
        let student = await Student.findById(studentId).populate("interviews");
        return res.render("interviews", {
            interviews: student.interviews,
            path: req.originalUrl,
        });
    } catch (error) {
        return res.render("404", {
            error: {
                status: 511,
                message: error.message,
            },
        });
    }
};

// Controller to add a new interview
module.exports.create = async (req, res) => {
    try {
        let interview = await Interview.findOne(req.body);
        if (!interview) interview = await Interview.create(req.body);
        return res.redirect(req.originalUrl);
    } catch (error) {
        return res.render("404", {
            error: {
                status: 512,
                message: error.message,
            },
        });
    }
};

// Controller to update a interview
module.exports.update = async (req, res) => {
    try {
        let studentId = req.params.id;
        let student = await Student.findById(studentId);
        if (!student) return res.status(401).json({ message: "Student Not Found" });
        let interview = await Interview.findOne(req.body);
        if (!interview) interview = await Interview.create(req.body);
        // console.log(student, interview);
        student = await Student.findByIdAndUpdate(studentId, { $addToSet: { interviews: interview.id } }, { new: true });
        interview = await Interview.findByIdAndUpdate(interview.id, { $addToSet: { students: studentId } }, { new: true });
        // console.log(student, interview);
        return res.redirect(req.originalUrl);
    } catch (error) {
        return res.render("404", {
            error: {
                status: 513,
                message: error.message,
            },
        });
    }
};

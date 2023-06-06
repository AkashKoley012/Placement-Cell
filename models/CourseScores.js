const mongoose = require("mongoose");

// Schema for Course Scores
const courseScoresSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    dsaFinalScore: { type: String, required: true },
    webDFinalScore: { type: String, required: true },
    reactFinalScore: { type: String, required: true },
});

const CourseScores = mongoose.model("CourseScores", courseScoresSchema);
module.exports = CourseScores;

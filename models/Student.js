const mongoose = require("mongoose");

// Schema for Student Details
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    collage: { type: String, required: true },
    status: { type: String, enum: ["Placed", "Not Placed"], required: true },
    interviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Interview" }],
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;

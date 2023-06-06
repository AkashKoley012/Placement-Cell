const mongoose = require("mongoose");

// Schema for Employee
const employeeSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;

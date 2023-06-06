const express = require("express");
const { update, create, all, allId, updateScore, studentData } = require("../controllers/student");
const router = express.Router();

// Route to retrieve a list of students of interview id
router.get("/:id", allId);
// Route to retrieve a student data
router.get("/data/:id", studentData);
// Route to retrieve a list of students
router.get("/", all);
// Route to update a student
router.post("/update/:id", updateScore);
// Route to add a new and update Student
router.post("/:id", update);
// Route to add a new Student
router.post("/", create);

module.exports = router;

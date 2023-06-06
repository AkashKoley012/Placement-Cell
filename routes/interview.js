const express = require("express");
const { all, allId, create, update } = require("../controllers/interview");
const router = express.Router();

// Route to retrieve a list of Interview
router.get("/", all);
// Route to retrieve a list of Interview of interview id
router.get("/:id", allId);
// Route to add a new Interview
router.post("/", create);
// Route to add a new Interview
router.post("/:id", update);

module.exports = router;

const express = require("express");
const { signupForm, signup, signinForm, signin } = require("../controllers/auth");

const router = express.Router();

router.get("/signup", signupForm);
router.post("/signup", signup);
router.get("/signin", signinForm);
router.post("/signin", signin);

module.exports = router;

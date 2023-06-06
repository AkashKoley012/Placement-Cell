const express = require("express");
const { isAuthenticated } = require("../config/auth");

const router = express.Router();

router.use("/students", isAuthenticated, require("./student"));
router.use("/interviews", isAuthenticated, require("./interview"));
router.use("/", require("./auth"));
router.use("/", isAuthenticated, (req, res) => {
    return res.redirect("/students");
});

module.exports = router;

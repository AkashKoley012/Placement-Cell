const Employee = require("../models/Employee"); // Replace with your Employee model
const CryptoJS = require("crypto-js");

exports.signupForm = (req, res) => {
    return res.render("signup"); // Render the signup form view
};

exports.signup = async (req, res) => {
    try {
        // Create a new employee
        let { email, password, repPassword } = req.body;
        if (password !== repPassword) {
            req.flash("error", "Password does not match");
            return res.redirect("back");
        }
        password = CryptoJS.AES.encrypt(password, process.env.SECRECT_KEY);
        const employee = await Employee.create({ username: email, password: password });
        return res.redirect("/signin"); // Redirect to the sign-in page
    } catch (error) {
        return res.render("404", {
            error: {
                status: 500,
                message: "Failed to sign up",
            },
        });
    }
};

exports.signinForm = (req, res) => {
    res.render("signin"); // Render the sign-in form view
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the employee by username and verify the password
        const employee = await Employee.findOne({ username: email });
        if (!employee) {
            req.flash("error", "Invalid username or password");
            return res.redirect("back");
        }
        const hashedPassword = CryptoJS.AES.decrypt(employee.password, process.env.SECRECT_KEY);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if (originalPassword !== password) {
            req.flash("error", "Invalid username or password");
            return res.redirect("back");
        }
        // Set the employee ID in the session or create a token for authentication
        req.session.isAuth = true;
        // Redirect to the protected employee page
        req.flash("success", "Login successful");
        return res.redirect("/students");
    } catch (error) {
        return res.render("404", {
            error: {
                status: 500,
                message: error.message,
            },
        });
    }
};

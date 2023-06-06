exports.isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated, e.g., by verifying the session or token
    if (req.session.isAuth) {
        return next();
    }
    return res.redirect("/signin"); // Redirect to the sign-in page if not authenticated
};

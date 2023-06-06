const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const flash = require("connect-flash");
const { setFlash } = require("./config/flash");
const port = process.env.PORT || 8000;
const app = express();

// set up for session
app.use(
    session({
        secret: "Serect",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
        store: new MongoDBSession({
            uri: process.env.DB || "mongodb://127.0.0.1:27017/placement_cell",
            collection: "sessions",
        }),
    })
);
// flash messages
app.use(flash());
app.use(setFlash);
// set up for json request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");
// set up for static folder
app.use(express.static("./assets"));
// set up for routes and methods
app.use(morgan("dev"));
// set up for layouts
app.use(expressLayouts);

app.use("/", require("./routes"));

app.listen(port, (err) => {
    if (err) console.log(`Error in running the server: ${err}`);
    else console.log(`Server is running on port: ${port}`);
});

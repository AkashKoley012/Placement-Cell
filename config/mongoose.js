const mongoose = require("mongoose");

const databaseURL = process.env.DB || "mongodb://127.0.0.1:27017/placement_cell";

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(databaseURL);
    console.log("DB Connected");
}

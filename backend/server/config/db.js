require("dotenv").config();

const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;

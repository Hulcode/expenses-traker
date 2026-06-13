const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    icon: {
      type: String,
    },

    source: {
      type: String,
      required: true, // Example: Salary, Freelance, etc.
    },

    amount: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Income = mongoose.model("income", incomeSchema);

module.exports = Income;

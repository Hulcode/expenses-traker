const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenceSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    icon: {
      type: String,
    },

    category: {
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

const Expence = mongoose.model("expences", expenceSchema);

module.exports = Expence;

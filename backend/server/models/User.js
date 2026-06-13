const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    maxlength: 25,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "Please enter an email"],
    unique: true,
    validate: [
      (val) => {
        return validator.isEmail(val);
      },
      "Please enter a valid email",
    ],
  },
  profileImageUrl: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  createdIn: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (params) {
  return await bcrypt.compare(params, this.password);
};

const User = mongoose.model("users", userSchema);

module.exports = User;

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = (id) => {
  return jwt.sign(
    { id }, // payload — data stored in the token
    process.env.JWT_AUTH, // secret key to sign it
    { expiresIn: "10h" }, // token expires after 1 hour
  );
};

exports.registerUser = async (req, res) => {
  const { email, password, fullName, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email is already used",
      });
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });
    const { password: _, ...userData } = newUser.toObject();

    res.status(200).json({
      ...userData,
      accessToken: generateToken(newUser._id),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const { password: _, ...userData } = user.toObject();
    res.status(200).json({
      ...userData,

      accessToken: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

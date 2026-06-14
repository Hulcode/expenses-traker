const express = require("express");
const jwtCheck = require("../../utilities/utilities");
const { upload, cloudinary } = require("../../utilities/cloudinary");

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");

const router = express.Router();
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getUser", jwtCheck, getUserInfo);

router.post("/upload-image", jwtCheck, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.status(200).json({ imageUrl: req.file.path });
});
module.exports = router;

const express = require("express");
const jwtCheck = require("../../utilities/utilities");

const upload = require("../../utilities/uploadMiddleware");
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
  if (!req.file) {
    return res.status(200).json({ message: "No file Uplouded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.status(200).json({ imageUrl });
});
module.exports = router;

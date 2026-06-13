const multer = require("multer");

const storage = multer.diskStorage({
  // Where to save the file
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // saves to /uploads folder
    //  ↑
    // null = no error
  },

  // What to name the file
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
    // "photo.jpg" → "1780913462390-photo.jpg"  ← unique name, no overwrites
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // ✅ accept the file
  } else {
    cb(new Error("Only .jpeg, .jpg and .png formats are allowed"), false); // ❌ reject
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;

const express = require("express");
const protect = require("../../utilities/utilities");
const {
  addExpence,
  getAllExpence,
  deleteExpence,
  downloadExpenceExcel,
} = require("../controllers/expenceController");

const router = express.Router();

router.post("/add", protect, addExpence);

router.get("/get", protect, getAllExpence);

router.get("/downloadexcel", protect, downloadExpenceExcel);

router.delete("/:id", protect, deleteExpence);

module.exports = router;

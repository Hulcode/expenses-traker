const express = require("express");
const protect = require("../../utilities/utilities");
const getDashboardData = require("../controllers/dashBoardController");

const router = express.Router();

router.get("/", protect, getDashboardData);

module.exports = router;

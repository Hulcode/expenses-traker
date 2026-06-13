const User = require("../models/User");
const Expence = require("../models/Expence");
const xlsx = require("xlsx");

async function addExpence(req, res) {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    // Validation: Check for missing fields
    if (!category || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpence = new Expence({
      userId,
      icon,
      category,
      amount,
      date: date ? new Date(date) : Date.now(),
    });

    await newExpence.save();
    res.status(200).json(newExpence);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
async function getAllExpence(req, res) {
  const userId = req.user.id;
  try {
    const expence = await Expence.find({ userId: userId }).sort({ date: -1 });
    res.status(200).json(expence);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteExpence(req, res) {
  const expenceId = req.params.id;
  try {
    await Expence.findByIdAndDelete(expenceId);
    res.status(200).json({ message: "Income deleted sucessfull" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

async function downloadExpenceExcel(req, res) {
  const userId = req.user.id;
  try {
    const expence = await Expence.find({ userId }).sort({ date: -1 });
    const data = expence.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: new Date(item.date).toLocaleDateString("en-US"),
      Icon: item.icon || "N/A",
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expence");
    const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=income_details.xlsx",
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  addExpence,
  getAllExpence,
  deleteExpence,
  downloadExpenceExcel,
};

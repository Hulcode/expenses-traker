const User = require("../models/User");
const Income = require("../models/Income");
const xlsx = require("xlsx");
async function addIncome(req, res) {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    // Validation: Check for missing fields
    if (!source || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: date ? new Date(date) : Date.now(),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
}

async function getAllIncome(req, res) {
  const userId = req.user.id;
  try {
    const incomes = await Income.find({ userId: userId }).sort({ date: -1 });
    res.status(200).json({ incomes });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteIncome(req, res) {
  const incomeId = req.params.id;
  try {
    const incomes = await Income.findByIdAndDelete(incomeId);
    res.status(200).json({ message: "Income deleted sucessfull" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

async function downloadIncomeExcel(req, res) {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: new Date(item.date).toLocaleDateString("en-US"),
      Icon: item.icon || "N/A",
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
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

module.exports = { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel };

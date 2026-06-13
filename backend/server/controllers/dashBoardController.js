const Income = require("../models/Income");
const Expence = require("../models/Expence");
const mongoose = require("mongoose");
async function getDashboardData(req, res) {
  const userId = req.user.id; // Bug 1 fix

  try {
    // Total Income
    const incomeData = await Income.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Total Expense
    const expenceData = await Expence.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // Bug 2 fix
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Last 60 Days Income - Bug 6 fix (use find to keep transactions)
    const incomeLast60DaysTransactions = (
      await Income.find({
        userId,
        date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
      }).sort({ date: -1 })
    ).map((trs) => ({ ...trs.toObject(), type: "income" }));

    const totalIncomeLast60Days = incomeLast60DaysTransactions.reduce(
      (sum, item) => sum + item.amount,
      0,
    );

    // Last 30 Days Expense - Bug 3 fix (30 not 60), Bug 6 fix
    const expenceLast30DaysTransactions = (
      await Expence.find({
        userId,
        date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      }).sort({ date: -1 })
    ).map((trs) => ({ ...trs.toObject(), type: "expense" }));

    const totalExpenceLast30Days = expenceLast30DaysTransactions.reduce(
      (sum, item) => sum + item.amount,
      0,
    );

    // Recent Transactions
    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (trs) => ({ ...trs.toObject(), type: "income" }),
      ),
      ...(await Expence.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (trs) => ({ ...trs.toObject(), type: "expense" }),
      ),
    ].sort((a, b) => b.date - a.date);

    res.status(200).json({
      totalBalance: (incomeData[0]?.total || 0) - (expenceData[0]?.total || 0),
      totalIncome: incomeData[0]?.total || 0,
      totalExpenses: expenceData[0]?.total || 0,
      ExpenceLast30Days: {
        total: totalExpenceLast30Days, // Bug 4 fix
        transactions: expenceLast30DaysTransactions, // Bug 4 fix
      },
      IncomeLast60Days: {
        total: totalIncomeLast60Days, // Bug 4 fix
        transactions: incomeLast60DaysTransactions, // Bug 4 fix
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error }); // Bug 5 fix
  }
}

module.exports = getDashboardData;

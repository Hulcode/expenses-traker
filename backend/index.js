require("dotenv").config(); // loads .env file variables into process.env
const express = require("express");
const connect = require("./server/config/db");
const authRoutes = require("./server/routes/authRoutes");
const expenceRoutes = require("./server/routes/expenceRoutes");
const incomeRoutes = require("./server/routes/incomeRoutes");
const dashBoardRoutes = require("./server/routes/dashBoardRoutes");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

connect();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/expense", expenceRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/dashboard", dashBoardRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

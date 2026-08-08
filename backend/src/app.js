const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("./config/googleAuth");
const expenseRoutes = require("./routes/expense.routes");
const incomeRoutes = require("./routes/income.routes");
const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const categoryRoutes = require("./routes/category.routes");
const app = express();


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Expense Tracker API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app;
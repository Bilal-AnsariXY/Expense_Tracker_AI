const express = require("express");
const verifyToken = require("../middleware/auth.middleware");

const {
  getDashboardSummary,
  getRecentTransactions,
  getMonthlySummary,
  getCategoryExpense,
  getCategoryIncome,
  getLatestExpenses,
  getLatestIncome,
  getProfile,
  updateProfile,    
} = require("../controllers/dashboard.controller");

const router = express.Router();

// Dashboard Summary
router.get("/summary", verifyToken, getDashboardSummary);

// Recent Transactions
router.get("/recent-transactions", verifyToken, getRecentTransactions);

// Monthly Summary
router.get("/monthly-summary", verifyToken, getMonthlySummary);

// Expense by Category
router.get("/category-expense", verifyToken, getCategoryExpense);

// Income by Category
router.get("/category-income", verifyToken, getCategoryIncome);

// Latest Expenses
router.get("/latest-expenses", verifyToken, getLatestExpenses);

// Latest Income
router.get("/latest-income", verifyToken, getLatestIncome);

// User Profile
router.get("/profile", verifyToken, getProfile);

// Update Profile
router.put("/profile", verifyToken, updateProfile);

module.exports = router;

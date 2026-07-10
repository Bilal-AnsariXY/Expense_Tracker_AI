const {
  getDashboardSummaryService,
  getRecentTransactionsService,
  getMonthlySummaryService,
  getCategoryExpenseService,
  getCategoryIncomeService,
  getLatestExpensesService,
  getLatestIncomeService,
  getProfileService,
} = require("../services/dashboard.service");

// Dashboard Summary
const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.userId;

    const data = await getDashboardSummaryService(userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Recent Transactions
const getRecentTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;

    const data = await getRecentTransactionsService(userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Monthly Summary
const getMonthlySummary = async (req, res) => {
  try {
    const userId = req.user.userId;

    const data = await getMonthlySummaryService(userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Expense by Category
const getCategoryExpense = async (req, res) => {
  try {
    const userId = req.user.userId;

    const data = await getCategoryExpenseService(userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Income by Category
const getCategoryIncome = async (req, res) => {
  try {
    const userId = req.user.userId;

    const data = await getCategoryIncomeService(userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Latest Expenses
const getLatestExpenses = async (req, res) => {
  try {
    const userId = req.user.userId;

    const data = await getLatestExpensesService(userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Latest Income
const getLatestIncome = async (req, res) => {
  try {
    const userId = req.user.userId;

    const data = await getLatestIncomeService(userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// User Profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const data = await getProfileService(userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { Name, Email } = req.body;

    const request = new sql.Request();

    request.input("UserId", sql.Int, userId);
    request.input("Name", sql.NVarChar(255), Name);
    request.input("Email", sql.NVarChar(255), Email);

    const result = await request.query(`
      UPDATE Users
      SET
        Name = @Name,
        Email = @Email
      WHERE UserId = @UserId
    `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};  
module.exports = {
  getDashboardSummary,
  getRecentTransactions,
  getMonthlySummary,
  getCategoryExpense,
  getCategoryIncome,
  getLatestExpenses,
  getLatestIncome,
  getProfile,
  updateProfile,
};

const { pool } = require("../config/db");

// ===========================
// DASHBOARD SUMMARY
// ===========================
const getDashboardSummaryService = async (userId) => {
  const incomeResult = await pool.query(
    `
    SELECT COALESCE(SUM(Amount),0) AS TotalIncome
    FROM Income
    WHERE UserId = $1
    `,
    [userId],
  );

  const expenseResult = await pool.query(
    `
    SELECT COALESCE(SUM(Amount),0) AS TotalExpense
    FROM Expenses
    WHERE UserId = $1
    `,
    [userId],
  );

  const totalIncome = Number(incomeResult.rows[0].totalincome);
  const totalExpense = Number(expenseResult.rows[0].totalexpense);

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
  };
};

// ===========================
// RECENT TRANSACTIONS
// ===========================
const getRecentTransactionsService = async (userId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM (
      SELECT
        'Expense' AS Type,
        e.ExpenseId AS Id,
        c.CategoryName,
        e.Amount,
        e.Description,
        e.ExpenseDate AS TransactionDate
      FROM Expenses e
      JOIN Categories c
        ON e.CategoryId = c.CategoryId
      WHERE e.UserId = $1

      UNION ALL

      SELECT
        'Income' AS Type,
        i.IncomeId AS Id,
        c.CategoryName,
        i.Amount,
        i.Description,
        i.IncomeDate AS TransactionDate
      FROM Income i
      JOIN Categories c
        ON i.CategoryId = c.CategoryId
      WHERE i.UserId = $1
    ) Transactions
    ORDER BY TransactionDate DESC
    LIMIT 10
    `,
    [userId],
  );

  return result.rows;
};

// ===========================
// MONTHLY SUMMARY
// ===========================
const getMonthlySummaryService = async (userId) => {
  const income = await pool.query(
    `
    SELECT
      EXTRACT(MONTH FROM IncomeDate) AS MonthNumber,
      TRIM(TO_CHAR(IncomeDate,'Month')) AS MonthName,
      SUM(Amount) AS TotalIncome
    FROM Income
    WHERE UserId = $1
    GROUP BY
      EXTRACT(MONTH FROM IncomeDate),
      TRIM(TO_CHAR(IncomeDate,'Month'))
    ORDER BY MonthNumber
    `,
    [userId],
  );

  const expense = await pool.query(
    `
    SELECT
      EXTRACT(MONTH FROM ExpenseDate) AS MonthNumber,
      TRIM(TO_CHAR(ExpenseDate,'Month')) AS MonthName,
      SUM(Amount) AS TotalExpense
    FROM Expenses
    WHERE UserId = $1
    GROUP BY
      EXTRACT(MONTH FROM ExpenseDate),
      TRIM(TO_CHAR(ExpenseDate,'Month'))
    ORDER BY MonthNumber
    `,
    [userId],
  );

  return {
    income: income.rows,
    expense: expense.rows,
  };
};

// ===========================
// CATEGORY EXPENSE
// ===========================
const getCategoryExpenseService = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      c.CategoryName,
      SUM(e.Amount) AS TotalExpense
    FROM Expenses e
    JOIN Categories c
      ON e.CategoryId = c.CategoryId
    WHERE e.UserId = $1
    GROUP BY c.CategoryName
    ORDER BY SUM(e.Amount) DESC
    `,
    [userId],
  );

  return result.rows;
};

// ===========================
// CATEGORY INCOME
// ===========================
const getCategoryIncomeService = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      c.CategoryName,
      SUM(i.Amount) AS TotalIncome
    FROM Income i
    JOIN Categories c
      ON i.CategoryId = c.CategoryId
    WHERE i.UserId = $1
    GROUP BY c.CategoryName
    ORDER BY SUM(i.Amount) DESC
    `,
    [userId],
  );

  return result.rows;
};

// ===========================
// LATEST EXPENSES
// ===========================
const getLatestExpensesService = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      e.ExpenseId,
      c.CategoryName,
      e.Amount,
      e.Description,
      e.ExpenseDate
    FROM Expenses e
    JOIN Categories c
      ON e.CategoryId = c.CategoryId
    WHERE e.UserId = $1
    ORDER BY e.ExpenseDate DESC
    LIMIT 5
    `,
    [userId],
  );

  return result.rows;
};

// ===========================
// LATEST INCOME
// ===========================
const getLatestIncomeService = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      i.IncomeId,
      c.CategoryName,
      i.Amount,
      i.Description,
      i.IncomeDate
    FROM Income i
    JOIN Categories c
      ON i.CategoryId = c.CategoryId
    WHERE i.UserId = $1
    ORDER BY i.IncomeDate DESC
    LIMIT 5
    `,
    [userId],
  );

  return result.rows;
};

// ===========================
// USER PROFILE
// ===========================
const getProfileService = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      UserId,
      GoogleId,
      Name,
      Email,
      ProfilePicture,
      CreatedAt
    FROM Users
    WHERE UserId = $1
    `,
    [userId],
  );

  return result.rows[0];
};

module.exports = {
  getDashboardSummaryService,
  getRecentTransactionsService,
  getMonthlySummaryService,
  getCategoryExpenseService,
  getCategoryIncomeService,
  getLatestExpensesService,
  getLatestIncomeService,
  getProfileService,
};

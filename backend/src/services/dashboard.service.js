const { sql } = require("../config/db");

// ===========================
// DASHBOARD SUMMARY
// ===========================

const getDashboardSummaryService = async (userId) => {
  // Total Income
  const incomeResult = await sql.query`
    SELECT ISNULL(SUM(Amount),0) AS TotalIncome
    FROM Income
    WHERE UserId = ${userId}
  `;

  // Total Expense
  const expenseResult = await sql.query`
    SELECT ISNULL(SUM(Amount),0) AS TotalExpense
    FROM Expenses
    WHERE UserId = ${userId}
  `;

  const totalIncome = incomeResult.recordset[0].TotalIncome;
  const totalExpense = expenseResult.recordset[0].TotalExpense;

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
  const result = await sql.query`

SELECT TOP 10 *

FROM
(

SELECT

'Expense' AS Type,
e.ExpenseId AS Id,
c.CategoryName,
e.Amount,
e.Description,
e.ExpenseDate AS TransactionDate

FROM Expenses e

JOIN Categories c
ON e.CategoryId=c.CategoryId

WHERE e.UserId=${userId}

UNION ALL

SELECT

'Income',
i.IncomeId,
c.CategoryName,
i.Amount,
i.Description,
i.IncomeDate

FROM Income i

JOIN Categories c
ON i.CategoryId=c.CategoryId

WHERE i.UserId=${userId}

) Transactions

ORDER BY TransactionDate DESC

`;

  return result.recordset;
};

// ===========================
// MONTHLY SUMMARY
// ===========================

const getMonthlySummaryService = async (userId) => {
  const income = await sql.query`

SELECT

MONTH(IncomeDate) MonthNumber,
DATENAME(MONTH,IncomeDate) MonthName,
SUM(Amount) TotalIncome

FROM Income

WHERE UserId=${userId}

GROUP BY

MONTH(IncomeDate),
DATENAME(MONTH,IncomeDate)

ORDER BY MonthNumber

`;

  const expense = await sql.query`

SELECT

MONTH(ExpenseDate) MonthNumber,
DATENAME(MONTH,ExpenseDate) MonthName,
SUM(Amount) TotalExpense

FROM Expenses

WHERE UserId=${userId}

GROUP BY

MONTH(ExpenseDate),
DATENAME(MONTH,ExpenseDate)

ORDER BY MonthNumber

`;

  return {
    income: income.recordset,
    expense: expense.recordset,
  };
};

// ===========================
// CATEGORY EXPENSE
// ===========================

const getCategoryExpenseService = async (userId) => {
  const result = await sql.query`

SELECT

c.CategoryName,

SUM(e.Amount) AS TotalExpense

FROM Expenses e

JOIN Categories c
ON e.CategoryId=c.CategoryId

WHERE e.UserId=${userId}

GROUP BY c.CategoryName

ORDER BY TotalExpense DESC

`;

  return result.recordset;
};

// ===========================
// CATEGORY INCOME
// ===========================

const getCategoryIncomeService = async (userId) => {
  const result = await sql.query`

SELECT

c.CategoryName,

SUM(i.Amount) AS TotalIncome

FROM Income i

JOIN Categories c
ON i.CategoryId=c.CategoryId

WHERE i.UserId=${userId}

GROUP BY c.CategoryName

ORDER BY TotalIncome DESC

`;

  return result.recordset;
};

// ===========================
// LATEST EXPENSES
// ===========================

const getLatestExpensesService = async (userId) => {
  const result = await sql.query`

SELECT TOP 5

e.ExpenseId,
c.CategoryName,
e.Amount,
e.Description,
e.ExpenseDate

FROM Expenses e

JOIN Categories c
ON e.CategoryId=c.CategoryId

WHERE e.UserId=${userId}

ORDER BY e.ExpenseDate DESC

`;

  return result.recordset;
};

// ===========================
// LATEST INCOME
// ===========================

const getLatestIncomeService = async (userId) => {
  const result = await sql.query`

SELECT TOP 5

i.IncomeId,
c.CategoryName,
i.Amount,
i.Description,
i.IncomeDate

FROM Income i

JOIN Categories c
ON i.CategoryId=c.CategoryId

WHERE i.UserId=${userId}

ORDER BY i.IncomeDate DESC

`;

  return result.recordset;
};

// ===========================
// USER PROFILE
// ===========================

const getProfileService = async (userId) => {
  const result = await sql.query`

SELECT

UserId,
GoogleId,
Name,
Email,
ProfilePicture,
CreatedAt

FROM Users

WHERE UserId=${userId}

`;

  return result.recordset[0];
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

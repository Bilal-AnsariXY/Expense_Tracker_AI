const { sql } = require("../config/db");

const getAllExpenses = async (req, res) => {
  try {
    const userId = req.user.userId;

    const request = new sql.Request();

    request.input("UserId", sql.Int, userId);

    const result = await request.query(`
     SELECT
          e.ExpenseId,
          e.UserId,
          e.CategoryId,
          c.CategoryName,
          e.Amount,
          e.Description,
          e.ExpenseDate,
          e.CreatedAt
      FROM Expenses e
      INNER JOIN Categories c
          ON e.CategoryId = c.CategoryId
      WHERE e.UserId = @UserId
      ORDER BY e.ExpenseDate DESC;
    `);
      console.log("get all expence ")
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const createExpense = async (req, res) => {
  try {
    // Get the logged-in user's ID from the JWT
    const userId = req.user.userId;

    // Get the remaining data from the request body
    const { CategoryId, Amount, Description, ExpenseDate } = req.body;

    const request = new sql.Request();

    request.input("UserId", sql.Int, userId);
    request.input("CategoryId", sql.Int, CategoryId);
    request.input("Amount", sql.Decimal(10, 2), Amount);
    request.input("Description", sql.NVarChar(255), Description);
    request.input("ExpenseDate", sql.Date, ExpenseDate);

    await request.query(`
      INSERT INTO Expenses
      (
        UserId,
        CategoryId,
        Amount,
        Description,
        ExpenseDate
      )
      VALUES
      (
        @UserId,
        @CategoryId,
        @Amount,
        @Description,
        @ExpenseDate
      )
    `);

    res.status(201).json({
      success: true,
      message: "Expense Created Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const expenseId = req.params.id;

    const request = new sql.Request();

    request.input("ExpenseId", sql.Int, expenseId);
    request.input("UserId", sql.Int, userId);

    const result = await request.query(`
      SELECT *
      FROM Expenses
      WHERE ExpenseId = @ExpenseId
      AND UserId = @UserId
    `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Expense Not Found",
      });
    }

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const updateExpense = async (req, res) => {
  try {
    const userId = req.user.userId;
    const expenseId = req.params.id;

    const { CategoryId, Amount, Description, ExpenseDate } = req.body;

    const request = new sql.Request();

    request.input("ExpenseId", sql.Int, expenseId);
    request.input("UserId", sql.Int, userId);
    request.input("CategoryId", sql.Int, CategoryId);
    request.input("Amount", sql.Decimal(10, 2), Amount);
    request.input("Description", sql.NVarChar(255), Description);
    request.input("ExpenseDate", sql.Date, ExpenseDate);

    const result = await request.query(`
      UPDATE Expenses
      SET
        CategoryId = @CategoryId,
        Amount = @Amount,
        Description = @Description,
        ExpenseDate = @ExpenseDate
      WHERE ExpenseId = @ExpenseId
      AND UserId = @UserId
    `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "Expense Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense Updated Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const userId = req.user.userId;
    const expenseId = req.params.id;

    const request = new sql.Request();

    request.input("ExpenseId", sql.Int, expenseId);
    request.input("UserId", sql.Int, userId);

    const result = await request.query(`
      DELETE FROM Expenses
      WHERE ExpenseId = @ExpenseId
      AND UserId = @UserId
    `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "Expense Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,

};


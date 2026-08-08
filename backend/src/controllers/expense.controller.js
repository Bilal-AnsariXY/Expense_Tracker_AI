const { pool } = require("../config/db");

// GET ALL EXPENSES
const getAllExpenses = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT
        e.expenseid,
        e.userid,
        e.categoryid,
        c.categoryname,
        e.amount,
        e.description,
        e.expensedate,
        e.createdat
      FROM expenses e
      INNER JOIN categories c
        ON e.categoryid = c.categoryid
      WHERE e.userid = $1
      ORDER BY e.expensedate DESC
      `,
      [userId],
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// CREATE EXPENSE
const createExpense = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { CategoryId, Amount, Description, ExpenseDate } = req.body;

    await pool.query(
      `
      INSERT INTO expenses
      (
        userid,
        categoryid,
        amount,
        description,
        expensedate
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5
      )
      `,
      [userId, CategoryId, Amount, Description, ExpenseDate],
    );

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

// GET EXPENSE BY ID
const getExpenseById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const expenseId = req.params.id;

    const result = await pool.query(
      `
      SELECT *
      FROM expenses
      WHERE expenseid = $1
      AND userid = $2
      `,
      [expenseId, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Expense Not Found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// UPDATE EXPENSE
const updateExpense = async (req, res) => {
  try {
    const userId = req.user.userId;
    const expenseId = req.params.id;

    const { CategoryId, Amount, Description, ExpenseDate } = req.body;

    const result = await pool.query(
      `
      UPDATE expenses
      SET
        categoryid = $1,
        amount = $2,
        description = $3,
        expensedate = $4
      WHERE expenseid = $5
      AND userid = $6
      `,
      [CategoryId, Amount, Description, ExpenseDate, expenseId, userId],
    );

    if (result.rowCount === 0) {
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

// DELETE EXPENSE
const deleteExpense = async (req, res) => {
  try {
    const userId = req.user.userId;
    const expenseId = req.params.id;

    const result = await pool.query(
      `
      DELETE FROM expenses
      WHERE expenseid = $1
      AND userid = $2
      `,
      [expenseId, userId],
    );

    if (result.rowCount === 0) {
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

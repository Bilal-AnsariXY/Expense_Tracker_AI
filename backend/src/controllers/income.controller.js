const { pool } = require("../config/db");

// =========================
// GET ALL INCOME
// =========================
const getAllIncome = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT
        i.incomeid,
        i.userid,
        i.categoryid,
        c.categoryname,
        i.amount,
        i.description,
        i.incomedate,
        i.createdat
      FROM income i
      LEFT JOIN categories c
        ON i.categoryid = c.categoryid
      WHERE i.userid = $1
      ORDER BY i.incomedate DESC
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

// =========================
// GET INCOME BY ID
// =========================
const getIncomeById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const incomeId = req.params.id;

    const result = await pool.query(
      `
      SELECT *
      FROM income
      WHERE incomeid = $1
        AND userid = $2
      `,
      [incomeId, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Income Not Found",
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

// =========================
// CREATE INCOME
// =========================
const createIncome = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { CategoryId, Amount, Description, IncomeDate } = req.body;

    await pool.query(
      `
      INSERT INTO income
      (
        userid,
        categoryid,
        amount,
        description,
        incomedate
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
      [userId, CategoryId, Amount, Description, IncomeDate],
    );

    res.status(201).json({
      success: true,
      message: "Income Created Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================
// UPDATE INCOME
// =========================
const updateIncome = async (req, res) => {
  try {
    const userId = req.user.userId;
    const incomeId = req.params.id;

    const { CategoryId, Amount, Description, IncomeDate } = req.body;

    const result = await pool.query(
      `
      UPDATE income
      SET
        categoryid = $1,
        amount = $2,
        description = $3,
        incomedate = $4
      WHERE incomeid = $5
        AND userid = $6
      `,
      [CategoryId, Amount, Description, IncomeDate, incomeId, userId],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Income Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Income Updated Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================
// DELETE INCOME
// =========================
const deleteIncome = async (req, res) => {
  try {
    const userId = req.user.userId;
    const incomeId = req.params.id;

    const result = await pool.query(
      `
      DELETE FROM income
      WHERE incomeid = $1
        AND userid = $2
      `,
      [incomeId, userId],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Income Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Income Deleted Successfully",
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
  getAllIncome,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
};

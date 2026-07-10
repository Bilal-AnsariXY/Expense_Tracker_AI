const { sql } = require("../config/db");

// GET ALL INCOME
const getAllIncome = async (req, res) => {
  try {
    const userId = req.user.userId;

    const request = new sql.Request();

    request.input("UserId", sql.Int, userId);

    const result = await request.query(`
      SELECT
    I.IncomeId,
    I.UserId,
    I.CategoryId,
    C.CategoryName,
    I.Amount,
    I.Description,
    I.IncomeDate,
    I.CreatedAt
FROM Income I
LEFT JOIN Categories C
ON I.CategoryId = C.CategoryId
WHERE I.UserId = @UserId
ORDER BY I.IncomeDate DESC;
    `);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// GET INCOME BY ID
const getIncomeById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const incomeId = req.params.id;

    const request = new sql.Request();

    request.input("IncomeId", sql.Int, incomeId);
    request.input("UserId", sql.Int, userId);

    const result = await request.query(`
      SELECT *
      FROM Income
      WHERE IncomeId = @IncomeId
      AND UserId = @UserId
    `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Income Not Found",
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

// CREATE INCOME
const createIncome = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { CategoryId, Amount, Description, IncomeDate } = req.body;

    const request = new sql.Request();

    request.input("UserId", sql.Int, userId);
    request.input("CategoryId", sql.Int, CategoryId);
    request.input("Amount", sql.Decimal(10, 2), Amount);
    request.input("Description", sql.NVarChar(255), Description);
    request.input("IncomeDate", sql.Date, IncomeDate);

    await request.query(`
      INSERT INTO Income
      (
        UserId,
        CategoryId,
        Amount,
        Description,
        IncomeDate
      )
      VALUES
      (
        @UserId,
        @CategoryId,
        @Amount,
        @Description,
        @IncomeDate
      )
    `);

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

// UPDATE INCOME
const updateIncome = async (req, res) => {
  try {
    const userId = req.user.userId;
    const incomeId = req.params.id;

    const { CategoryId, Amount, Description, IncomeDate } = req.body;

    const request = new sql.Request();

    request.input("IncomeId", sql.Int, incomeId);
    request.input("UserId", sql.Int, userId);
    request.input("CategoryId", sql.Int, CategoryId);
    request.input("Amount", sql.Decimal(10, 2), Amount);
    request.input("Description", sql.NVarChar(255), Description);
    request.input("IncomeDate", sql.Date, IncomeDate);

    const result = await request.query(`
      UPDATE Income
      SET
        CategoryId = @CategoryId,
        Amount = @Amount,
        Description = @Description,
        IncomeDate = @IncomeDate
      WHERE IncomeId = @IncomeId
      AND UserId = @UserId
    `);

    if (result.rowsAffected[0] === 0) {
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

// DELETE INCOME
const deleteIncome = async (req, res) => {
  try {
    const userId = req.user.userId;
    const incomeId = req.params.id;

    const request = new sql.Request();

    request.input("IncomeId", sql.Int, incomeId);
    request.input("UserId", sql.Int, userId);

    const result = await request.query(`
      DELETE FROM Income
      WHERE IncomeId = @IncomeId
      AND UserId = @UserId
    `);

    if (result.rowsAffected[0] === 0) {
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

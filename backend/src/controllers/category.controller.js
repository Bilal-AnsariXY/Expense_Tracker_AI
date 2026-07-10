const { sql } = require("../config/db");

// GET ALL CATEGORIES
const getAllCategories = async (req, res) => {
  try {
    const result = await sql.query(`
      SELECT *
      FROM Categories
      ORDER BY CategoryName
    `);

    res.status(200).json({
      success: true,
      data: result.recordset,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// GET CATEGORY BY ID
const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;

    const request = new sql.Request();

    request.input("CategoryId", sql.Int, id);

    const result = await request.query(`
      SELECT *
      FROM Categories
      WHERE CategoryId = @CategoryId
    `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.recordset[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// CREATE CATEGORY
const createCategory = async (req, res) => {
  try {
    const { CategoryName, CategoryType } = req.body;

    const request = new sql.Request();

    request.input("CategoryName", sql.NVarChar(100), CategoryName);
    request.input("CategoryType", sql.NVarChar(20), CategoryType);

    await request.query(`
      INSERT INTO Categories
      (
        CategoryName,
        CategoryType
      )
      VALUES
      (
        @CategoryName,
        @CategoryType
      )
    `);

    res.status(201).json({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// UPDATE CATEGORY
const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const { CategoryName, CategoryType } = req.body;

    const request = new sql.Request();

    request.input("CategoryId", sql.Int, id);
    request.input("CategoryName", sql.NVarChar(100), CategoryName);
    request.input("CategoryType", sql.NVarChar(20), CategoryType);

    const result = await request.query(`
      UPDATE Categories
      SET
        CategoryName = @CategoryName,
        CategoryType = @CategoryType
      WHERE CategoryId = @CategoryId
    `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// DELETE CATEGORY
const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const request = new sql.Request();

    request.input("CategoryId", sql.Int, id);

    const result = await request.query(`
      DELETE FROM Categories
      WHERE CategoryId = @CategoryId
    `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
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
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

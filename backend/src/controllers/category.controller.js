// const { sql } = require("../config/db");

// // GET ALL CATEGORIES
// const getAllCategories = async (req, res) => {
//   try {
//     const result = await sql.query(`
//       SELECT *
//       FROM Categories
//       ORDER BY CategoryName
//     `);

//     res.status(200).json({
//       success: true,
//       data: result.recordset,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// // GET CATEGORY BY ID
// const getCategoryById = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const request = new sql.Request();

//     request.input("CategoryId", sql.Int, id);

//     const result = await request.query(`
//       SELECT *
//       FROM Categories
//       WHERE CategoryId = @CategoryId
//     `);

//     if (result.recordset.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Category Not Found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: result.recordset[0],
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// // CREATE CATEGORY
// const createCategory = async (req, res) => {
//   try {
//     const { CategoryName, CategoryType } = req.body;

//     const request = new sql.Request();

//     request.input("CategoryName", sql.NVarChar(100), CategoryName);
//     request.input("CategoryType", sql.NVarChar(20), CategoryType);

//     await request.query(`
//       INSERT INTO Categories
//       (
//         CategoryName,
//         CategoryType
//       )
//       VALUES
//       (
//         @CategoryName,
//         @CategoryType
//       )
//     `);

//     res.status(201).json({
//       success: true,
//       message: "Category Created Successfully",
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// // UPDATE CATEGORY
// const updateCategory = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const { CategoryName, CategoryType } = req.body;

//     const request = new sql.Request();

//     request.input("CategoryId", sql.Int, id);
//     request.input("CategoryName", sql.NVarChar(100), CategoryName);
//     request.input("CategoryType", sql.NVarChar(20), CategoryType);

//     const result = await request.query(`
//       UPDATE Categories
//       SET
//         CategoryName = @CategoryName,
//         CategoryType = @CategoryType
//       WHERE CategoryId = @CategoryId
//     `);

//     if (result.rowsAffected[0] === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Category Not Found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Category Updated Successfully",
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// // DELETE CATEGORY
// const deleteCategory = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const request = new sql.Request();

//     request.input("CategoryId", sql.Int, id);

//     const result = await request.query(`
//       DELETE FROM Categories
//       WHERE CategoryId = @CategoryId
//     `);

//     if (result.rowsAffected[0] === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Category Not Found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Category Deleted Successfully",
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// module.exports = {
//   getAllCategories,
//   getCategoryById,
//   createCategory,
//   updateCategory,
//   deleteCategory,
// };

const { pool } = require("../config/db");

// GET ALL CATEGORIES
const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM Categories
      ORDER BY CategoryName
    `);

    res.status(200).json({
      success: true,
      data: result.rows,
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

    const result = await pool.query(
      `
      SELECT *
      FROM Categories
      WHERE CategoryId = $1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
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

    await pool.query(
      `
      INSERT INTO Categories
      (
        CategoryName,
        CategoryType
      )
      VALUES
      (
        $1,
        $2
      )
      `,
      [CategoryName, CategoryType],
    );

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

    const result = await pool.query(
      `
      UPDATE Categories
      SET
        CategoryName = $1,
        CategoryType = $2
      WHERE CategoryId = $3
      `,
      [CategoryName, CategoryType, id],
    );

    if (result.rowCount === 0) {
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

    const result = await pool.query(
      `
      DELETE FROM Categories
      WHERE CategoryId = $1
      `,
      [id],
    );

    if (result.rowCount === 0) {
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
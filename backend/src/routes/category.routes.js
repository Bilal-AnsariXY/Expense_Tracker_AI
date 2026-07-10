const express = require("express");

const verifyToken = require("../middleware/auth.middleware");

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const router = express.Router();

router.get("/", verifyToken, getAllCategories);

router.get("/:id", verifyToken, getCategoryById);

router.post("/", verifyToken, createCategory);

router.put("/:id", verifyToken, updateCategory);

router.delete("/:id", verifyToken, deleteCategory);

module.exports = router;

const express = require("express");
const verifyToken = require("../middleware/auth.middleware");
const router = express.Router();

const {
  getAllIncome,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/income.controller");

router.get("/", verifyToken, getAllIncome);

router.get("/:id", verifyToken, getIncomeById);

router.post("/", verifyToken,  createIncome);

router.put("/:id", verifyToken, updateIncome);

router.delete("/:id", verifyToken,   deleteIncome);

module.exports = router;

const express = require("express");
const verifyToken = require("../middleware/auth.middleware");
const router = express.Router();

const {
    getAllExpenses,
    createExpense,
    getExpenseById,
    updateExpense,
    deleteExpense,  
} = require("../controllers/expense.controller");

router.get("/", verifyToken, getAllExpenses);
router.post("/", verifyToken, createExpense);
router.get("/:id", verifyToken, getExpenseById);
router.put("/:id", verifyToken, updateExpense);
router.delete("/:id", verifyToken, deleteExpense);
module.exports = router;

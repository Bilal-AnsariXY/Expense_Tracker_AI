import expressApi from "./expressApi";

const normalizeExpense = (expense) => ({
  ExpenseId: expense.expenseid,
  UserId: expense.userid,
  CategoryId: expense.categoryid,
  CategoryName: expense.categoryname,
  Amount: Number(expense.amount),
  Description: expense.description || "",
  ExpenseDate: expense.expensedate,
  CreatedAt: expense.createdat,
});

const expenseService = {
  getExpenses: async () => {
    const response = await expressApi.get("/expenses");

    return response.data.map(normalizeExpense);
  },

  getExpenseById: async (id) => {
    const response = await expressApi.get(`/expenses/${id}`);

    return normalizeExpense(response.data);
  },

  createExpense: async (expenseData) => {
    const response = await expressApi.post("/expenses", expenseData);

    return normalizeExpense(response.data);
  },

  updateExpense: async (id, expenseData) => {
    const response = await expressApi.put(`/expenses/${id}`, expenseData);

    return normalizeExpense(response.data);
  },

  deleteExpense: async (id) => {
    const response = await expressApi.delete(`/expenses/${id}`);

    return response.data;
  },
};

export default expenseService;

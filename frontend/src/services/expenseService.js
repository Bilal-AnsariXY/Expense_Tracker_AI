import expressApi from "./expressApi";

const expenseService = {
  getExpenses: async () => {
    const response = await expressApi.get("/expenses");

    return response.data;
  },

  getExpenseById: async (id) => {
    const response = await expressApi.get(`/expenses/${id}`);

    return response.data;
  },

  createExpense: async (expenseData) => {
    const response = await expressApi.post("/expenses", expenseData);

    return response.data;
  },

  updateExpense: async (id, expenseData) => {
    const response = await expressApi.put(`/expenses/${id}`, expenseData);

    return response.data;
  },

  deleteExpense: async (id) => {
    const response = await expressApi.delete(`/expenses/${id}`);

    return response.data;
  },
};

export default expenseService;

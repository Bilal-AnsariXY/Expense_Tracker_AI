import api from "./expressApi";

const dashboardService = {
  getSummary: async () => {
    const response = await api.get("/dashboard/summary");
    return response.data.data;
  },

  getRecentTransactions: async () => {
    const response = await api.get("/dashboard/recent-transactions");
    return response.data.data;
  },

  getMonthlySummary: async () => {
    const response = await api.get("/dashboard/monthly-summary");
    return response.data.data;
  },

  getCategoryExpense: async () => {
    const response = await api.get("/dashboard/category-expense");
    return response.data.data;
  },

  getCategoryIncome: async () => {
    const response = await api.get("/dashboard/category-income");
    return response.data.data;
  },

  getLatestExpenses: async () => {
    const response = await api.get("/dashboard/latest-expenses");
    return response.data.data;
  },

  getLatestIncome: async () => {
    const response = await api.get("/dashboard/latest-income");
    return response.data.data;
  },

  getProfile: async () => {
    const response = await api.get("/dashboard/profile");
    return response.data.data;
  },

  updateProfile: async (data) => {
    const response = await api.put("/dashboard/profile", data);
    return response.data.data;
  },
};

export default dashboardService;

import flaskApi from "./flaskApi";

const analyticsService = {
  getSummary: async () => {
    const response = await flaskApi.get("/analytics/summary");
    return response.data.data;
  },

  getCategorySummary: async () => {
    const response = await flaskApi.get("/analytics/category");
    return response.data.data;
  },

  getMonthlySummary: async () => {
    const response = await flaskApi.get("/analytics/monthly");
    return response.data.data;
  },

  getIncomeExpense: async () => {
    const response = await flaskApi.get("/analytics/income-expense");
    return response.data.data;
  },

  getSavings: async () => {
    const response = await flaskApi.get("/analytics/savings");
    return response.data.data;
  },

  getTopExpenses: async () => {
    const response = await flaskApi.get("/analytics/top-expenses");
    return response.data.data;
  },

  getInsights: async () => {
    const response = await flaskApi.get("/analytics/insights");
    return response.data.data;
  },
};

export default analyticsService;

import expressApi from "./expressApi";

const incomeService = {
  getIncome: async () => {
    const response = await expressApi.get("/income");
    return response.data;
  },

  getIncomeById: async (id) => {
    const response = await expressApi.get(`/income/${id}`);
    return response.data;
  },

  createIncome: async (incomeData) => {
    const response = await expressApi.post("/income", incomeData);
    return response.data;
  },

  updateIncome: async (id, incomeData) => {
    const response = await expressApi.put(`/income/${id}`, incomeData);
    return response.data;
  },

  deleteIncome: async (id) => {
    const response = await expressApi.delete(`/income/${id}`);
    return response.data;
  },
};

export default incomeService;

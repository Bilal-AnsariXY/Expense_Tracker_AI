import expressApi from "./expressApi";

const normalizeIncome = (income) => ({
  IncomeId: income.incomeid,
  UserId: income.userid,
  CategoryId: income.categoryid,
  CategoryName: income.categoryname,
  Amount: Number(income.amount),
  Description: income.description || "",
  IncomeDate: income.incomedate,
  CreatedAt: income.createdat,
});

const incomeService = {
  getIncome: async () => {
    const response = await expressApi.get("/income");

    return response.data.map(normalizeIncome);
  },

  getIncomeById: async (id) => {
    const response = await expressApi.get(`/income/${id}`);

    return normalizeIncome(response.data);
  },

  createIncome: async (incomeData) => {
    const response = await expressApi.post("/income", incomeData);

    return normalizeIncome(response.data);
  },

  updateIncome: async (id, incomeData) => {
    const response = await expressApi.put(`/income/${id}`, incomeData);

    return normalizeIncome(response.data);
  },

  deleteIncome: async (id) => {
    const response = await expressApi.delete(`/income/${id}`);

    return response.data;
  },
};

export default incomeService;

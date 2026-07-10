import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  summary: null,

  category: [],

  monthly: [],

  savings: null,

  incomeExpense: null,

  topExpenses: [],

  insights: null,

  loading: false,

  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    dashboardLoading: (state) => {
      state.loading = true;

      state.error = null;
    },

    dashboardError: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },

    setSummary: (state, action) => {
      state.loading = false;

      state.summary = action.payload;
    },

    setCategory: (state, action) => {
      state.category = action.payload;
    },

    setMonthly: (state, action) => {
      state.monthly = action.payload;
    },

    setSavings: (state, action) => {
      state.savings = action.payload;
    },

    setIncomeExpense: (state, action) => {
      state.incomeExpense = action.payload;
    },

    setTopExpenses: (state, action) => {
      state.topExpenses = action.payload;
    },

    setInsights: (state, action) => {
      state.insights = action.payload;
    },
  },
});

export const {
  dashboardLoading,

  dashboardError,

  setSummary,

  setCategory,

  setMonthly,

  setSavings,

  setIncomeExpense,

  setTopExpenses,

  setInsights,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

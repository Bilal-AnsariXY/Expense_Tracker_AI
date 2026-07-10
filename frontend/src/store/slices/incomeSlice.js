import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  income: [],

  selectedIncome: null,

  loading: false,

  error: null,

  search: "",
};

const incomeSlice = createSlice({
  name: "income",

  initialState,

  reducers: {
    incomeLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    incomeError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setIncome: (state, action) => {
      state.loading = false;
      state.income = action.payload;
    },

    addIncome: (state, action) => {
      state.income.unshift(action.payload);
    },

    updateIncome: (state, action) => {
      state.income = state.income.map((item) =>
        item.IncomeId === action.payload.IncomeId ? action.payload : item,
      );
    },

    removeIncome: (state, action) => {
      state.income = state.income.filter(
        (item) => item.IncomeId !== action.payload,
      );
    },

    setSelectedIncome: (state, action) => {
      state.selectedIncome = action.payload;
    },

    clearSelectedIncome: (state) => {
      state.selectedIncome = null;
    },

    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  incomeLoading,
  incomeError,
  setIncome,
  addIncome,
  updateIncome,
  removeIncome,
  setSelectedIncome,
  clearSelectedIncome,
  setSearch,
} = incomeSlice.actions;

export default incomeSlice.reducer;

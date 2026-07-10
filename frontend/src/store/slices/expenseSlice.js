import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],

  selectedExpense: null,

  loading: false,

  error: null,

  search: "",
};

const expenseSlice = createSlice({
  name: "expense",

  initialState,

  reducers: {
    expenseLoading: (state) => {
      state.loading = true;

      state.error = null;
    },

    expenseError: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },

    setExpenses: (state, action) => {
      state.loading = false;

      state.expenses = action.payload;
    },

    addExpense: (state, action) => {
      state.expenses.unshift(action.payload);
    },

    updateExpense: (state, action) => {
      state.expenses = state.expenses.map((expense) =>
        expense.ExpenseId === action.payload.ExpenseId
          ? action.payload
          : expense,
      );
    },

    removeExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.ExpenseId !== action.payload,
      );
    },

    setSelectedExpense: (state, action) => {
      state.selectedExpense = action.payload;
    },

    clearSelectedExpense: (state) => {
      state.selectedExpense = null;
    },

    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  expenseLoading,
  expenseError,
  setExpenses,
  addExpense,
  updateExpense,
  removeExpense,
  setSelectedExpense,
  clearSelectedExpense,
  setSearch,
} = expenseSlice.actions;

export default expenseSlice.reducer;

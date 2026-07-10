import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";
import expenseReducer from "./slices/expenseSlice";
import incomeReducer from "./slices/incomeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    dashboard: dashboardReducer,

    expense: expenseReducer,

    income: incomeReducer,
  },
});

"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

import { store } from "./store";

import { restoreSession } from "./slices/authSlice";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(
        restoreSession({
          token,
          user: JSON.parse(user),
        }),
      );
    }
  }, [dispatch]);

  return children;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}

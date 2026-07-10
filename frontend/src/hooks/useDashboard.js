"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import analyticsService from "../services/analyticsService";

import {
  dashboardLoading,
  dashboardError,
  setSummary,
} from "../store/slices/dashboardSlice";

export default function useDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadDashboard() {
      try {
        dispatch(dashboardLoading());

        const response = await analyticsService.getSummary();

        dispatch(setSummary(response.data));
      } catch (error) {
        dispatch(dashboardError(error.message));
      }
    }

    loadDashboard();
  }, [dispatch]);
}

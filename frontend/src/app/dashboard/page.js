"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import dashboardService from "../../services/dashboardService";

import {
  dashboardLoading,
  dashboardError,
  setSummary,
  setCategory,
  setMonthly,
} from "../../store/slices/dashboardSlice";

import PageHeader from "../../components/common/PageHeader";
import SummaryCard from "../../components/dashboard/SummaryCard";
import CategoryPieChart from "../../components/dashboard/CategoryPieChart";
import MonthlyBarChart from "../../components/dashboard/MonthlyBarChart";
import TopCategories from "../../components/dashboard/TopCategories";
import IncomeExpenseChart from "../../components/dashboard/IncomeExpenseChart";

export default function DashboardPage() {
  const dispatch = useDispatch();

  const { summary, category, monthly, loading, error } = useSelector(
    (state) => state.dashboard,
  );

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      dispatch(dashboardLoading());

      const [summaryData, categoryData, monthlyData] = await Promise.all([
        dashboardService.getSummary(),
        dashboardService.getCategoryExpense(),
        dashboardService.getMonthlySummary(),
      ]);

      dispatch(setSummary(summaryData));
      dispatch(setCategory(categoryData));
      dispatch(setMonthly(monthlyData));
    } catch (error) {
      console.error(error);
      dispatch(dashboardError(error.message));
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-xl font-semibold">Loading Dashboard...</div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-xl font-semibold text-red-600">{error}</div>
    );
  }

  if (!summary) return null;

  return (
    <div className="space-y-8 p-8">
      <PageHeader title="Dashboard" subtitle="Monitor your finances." />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Balance"
          value={`₹${Number(summary.balance).toLocaleString()}`}
          icon="💰"
          color="bg-green-100"
        />

        <SummaryCard
          title="Total Income"
          value={`₹${Number(summary.totalIncome).toLocaleString()}`}
          icon="📈"
          color="bg-blue-100"
        />

        <SummaryCard
          title="Total Expense"
          value={`₹${Number(summary.totalExpense).toLocaleString()}`}
          icon="💸"
          color="bg-red-100"
        />

        <SummaryCard
          title="Average Expense"
          value="N/A"
          icon="📊"
          color="bg-yellow-100"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CategoryPieChart data={category} />
        </div>

        <TopCategories />
      </div>

      <MonthlyBarChart data={monthly?.expense || []} />

      <IncomeExpenseChart data={summary} />
    </div>
  );
}

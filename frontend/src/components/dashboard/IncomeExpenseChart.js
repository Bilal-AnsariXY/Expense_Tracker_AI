"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function IncomeExpenseChart({ data }) {
  if (!data) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Income vs Expense</h2>

        <p className="mt-6 text-gray-500">No data available.</p>
      </div>
    );
  }

  const chartData = [
    {
      name: "Income",
      amount: Number(data.totalIncome || 0),
    },
    {
      name: "Expense",
      amount: Number(data.totalExpense || 0),
    },
    {
      name: "Balance",
      amount: Number(data.balance || 0),
    },
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Income vs Expense</h2>

        <p className="text-gray-500">Compare your earnings and spending</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip
              formatter={(value) => `₹${Number(value).toLocaleString()}`}
            />

            <Bar dataKey="amount" fill="#2563eb" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

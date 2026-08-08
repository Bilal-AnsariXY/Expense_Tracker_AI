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
      <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
          Income vs Expense
        </h2>

        <p className="mt-6 text-sm text-gray-500 sm:text-base">
          No data available.
        </p>
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
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
          Income vs Expense
        </h2>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Compare your earnings and spending
        </p>
      </div>

      {/* Chart */}
      <div className="h-[280px] w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" tick={{ fontSize: 12 }} />

            <YAxis tick={{ fontSize: 12 }} width={55} />

            <Tooltip
              formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
            />

            <Bar
              dataKey="amount"
              fill="#2563eb"
              radius={[10, 10, 0, 0]}
              barSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

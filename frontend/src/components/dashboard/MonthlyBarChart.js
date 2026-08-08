"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function MonthlyBarChart({ data = [] }) {
  const chartData = data.map((item) => ({
    name: item.monthname,
    value: Number(item.totalexpense),
  }));

  console.log("MONTHLY CHART DATA:", chartData);

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="text-2xl font-bold text-gray-800">Monthly Expenses</h2>

      <p className="text-gray-500">Expense amount month by month</p>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip
              formatter={(value) => `₹${Number(value).toLocaleString()}`}
            />

            <Bar dataKey="value" fill="#2563eb" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

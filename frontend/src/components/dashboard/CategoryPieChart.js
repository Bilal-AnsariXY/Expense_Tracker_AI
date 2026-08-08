"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

export default function CategoryPieChart({ data = [] }) {
  console.log("PIE CHART DATA:", data);

  const chartData = data.map((item) => ({
    name: item.categoryname,
    value: Number(item.totalexpense),
  }));

  console.log("CHART DATA:", chartData);

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        Expenses by Category
      </h2>

      <div className="flex justify-center">
        <PieChart width={500} height={320}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => `₹${Number(value).toLocaleString()}`}
          />

          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

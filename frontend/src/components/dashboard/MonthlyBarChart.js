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
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
          Monthly Expenses
        </h2>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Expense amount month by month
        </p>
      </div>

      {/* Chart */}
      <div className="h-[280px] w-full sm:h-80">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-500 sm:text-base">
              No monthly expense data available.
            </p>
          </div>
        ) : (
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

              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />

              <YAxis tick={{ fontSize: 12 }} width={55} />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(value).toLocaleString("en-IN")}`
                }
              />

              <Bar
                dataKey="value"
                fill="#2563eb"
                radius={[10, 10, 0, 0]}
                barSize={35}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

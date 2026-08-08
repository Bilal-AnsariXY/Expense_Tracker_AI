"use client";

import { useEffect, useState } from "react";
import analyticsService from "../../services/analyticsService";

export default function AIInsights() {
  const [insight, setInsight] = useState(null);

  useEffect(() => {
    async function loadInsights() {
      try {
        const response = await analyticsService.getInsights();
        setInsight(response);
      } catch (error) {
        console.error(error);
      }
    }

    loadInsights();
  }, []);

  if (!insight) {
    return (
      <div className="w-full rounded-2xl bg-slate-900 p-4 text-white shadow-sm sm:p-6">
        <h2 className="text-xl font-bold sm:text-2xl">
          🤖 AI Financial Advisor
        </h2>

        <p className="mt-4 text-sm text-gray-300 sm:text-base">
          Loading Insights...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-slate-900 p-4 text-white shadow-sm sm:p-6">
      {/* Header */}
      <h2 className="mb-5 text-xl font-bold sm:mb-6 sm:text-2xl">
        🤖 AI Financial Advisor
      </h2>

      {/* Insights */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {/* Highest Spending Category */}
        <div className="rounded-xl bg-white/10 p-4 sm:p-5">
          <p className="text-sm text-gray-300">Highest Spending Category</p>

          <h3 className="mt-2 break-words text-xl font-bold sm:text-2xl">
            {insight.highestCategory || "N/A"}
          </h3>
        </div>

        {/* Highest Expense */}
        <div className="rounded-xl bg-white/10 p-4 sm:p-5">
          <p className="text-sm text-gray-300">Highest Expense</p>

          <h3 className="mt-2 break-words text-xl font-bold sm:text-2xl">
            ₹{Number(insight.highestExpense ?? 0).toLocaleString("en-IN")}
          </h3>
        </div>

        {/* Average Expense */}
        <div className="rounded-xl bg-white/10 p-4 sm:col-span-2 sm:p-5">
          <p className="text-sm text-gray-300">Average Expense</p>

          <h3 className="mt-2 break-words text-xl font-bold sm:text-2xl">
            ₹{Number(insight.averageExpense ?? 0).toLocaleString("en-IN")}
          </h3>
        </div>

        {/* AI Suggestion */}
        <div className="rounded-xl border border-green-300 bg-green-400/20 p-4 sm:col-span-2 sm:p-5">
          <p className="font-semibold text-green-100">💡 AI Suggestion</p>

          <p className="mt-2 break-words text-sm leading-7 text-white sm:text-base sm:leading-8">
            {insight.suggestion || "No suggestion available."}
          </p>
        </div>
      </div>
    </div>
  );
}

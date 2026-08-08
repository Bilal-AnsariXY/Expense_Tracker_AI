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
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold">🤖 AI Financial Advisor</h2>

        <p className="text-black">Loading Insights...</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white shadow-xl">
      <h2 className="mb-6 text-3xl font-bold">🤖 AI Financial Advisor</h2>

      <div className="space-y-5">
        <div className="rounded-xl bg-white/10 p-4">
          <p className="text-sm opacity-80">Highest Spending Category</p>

          <h3 className="mt-2 text-2xl font-bold">{insight.highestCategory}</h3>
        </div>

        <div className="rounded-xl bg-white/10 p-4">
          <p className="text-sm opacity-80">Highest Expense</p>

          <h3 className="mt-2 text-2xl font-bold">
            ₹{insight.highestExpense?.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-xl bg-white/10 p-4">
          <p className="text-sm opacity-80">Average Expense</p>

          <h3 className="mt-2 text-2xl font-bold">
            ₹{insight.averageExpense?.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-xl border border-green-300 bg-green-400/20 p-5">
          <p className="font-semibold">💡 AI Suggestion</p>

          <p className="mt-2 leading-7">{insight.suggestion}</p>
        </div>
      </div>
    </div>
  );
}

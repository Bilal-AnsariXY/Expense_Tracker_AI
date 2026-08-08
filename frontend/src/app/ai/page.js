"use client";

import { useEffect, useState } from "react";

import analyticsService from "../../services/analyticsService";
import aiService from "../../services/aiService";

import PageHeader from "../../components/common/PageHeader";

export default function AIPage() {
  const [summary, setSummary] = useState(null);
  const [insights, setInsights] = useState(null);
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const summaryData = await analyticsService.getSummary();
      const insightsData = await analyticsService.getInsights();

      setSummary(summaryData);
      setInsights(insightsData);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSend() {
    if (!question.trim() || loading) return;

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await aiService.askQuestion(question);

      const aiMessage = {
        sender: "ai",
        text: response.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
    setQuestion("");
  }

  return (
    <div className="w-full space-y-6">
      {/* PAGE HEADER */}
      <PageHeader
        title="AI Assistant"
        description="Analyze your finances and ask questions about your spending."
      />

      {/* SUMMARY */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
        {/* Total Income */}
        <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
          <h3 className="text-sm text-gray-500 sm:text-base">Total Income</h3>

          <p className="mt-2 break-words text-2xl font-bold text-green-600 sm:mt-3 sm:text-3xl">
            ₹{Number(summary?.totalIncome ?? 0).toLocaleString("en-IN")}
          </p>
        </div>

        {/* Total Expense */}
        <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
          <h3 className="text-sm text-gray-500 sm:text-base">Total Expense</h3>

          <p className="mt-2 break-words text-2xl font-bold text-red-600 sm:mt-3 sm:text-3xl">
            ₹{Number(summary?.totalExpense ?? 0).toLocaleString("en-IN")}
          </p>
        </div>

        {/* Savings */}
        <div className="rounded-2xl bg-white p-4 shadow-sm sm:col-span-2 sm:p-6 md:col-span-1">
          <h3 className="text-sm text-gray-500 sm:text-base">Savings</h3>

          <p className="mt-2 break-words text-2xl font-bold text-blue-600 sm:mt-3 sm:text-3xl">
            ₹
            {Number(summary?.savings ?? summary?.balance ?? 0).toLocaleString(
              "en-IN",
            )}
          </p>
        </div>
      </div>

      {/* AI INSIGHTS */}
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-5 text-xl font-bold text-black sm:mb-6 sm:text-2xl">
          AI Insights
        </h2>

        {insights ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {/* Average Expense */}
            <div className="rounded-xl bg-blue-50 p-4 sm:p-5">
              <p className="text-sm text-gray-500 sm:text-base">
                Average Expense
              </p>

              <p className="mt-2 break-words text-2xl font-bold text-blue-600 sm:text-3xl">
                ₹{Number(insights.averageExpense ?? 0).toLocaleString("en-IN")}
              </p>
            </div>

            {/* Highest Category */}
            <div className="rounded-xl bg-red-50 p-4 sm:p-5">
              <p className="text-sm text-gray-500 sm:text-base">
                Highest Category
              </p>

              <p className="mt-2 break-words text-2xl font-bold text-red-600 sm:text-3xl">
                {insights.highestCategory || "N/A"}
              </p>
            </div>

            {/* Highest Expense */}
            <div className="rounded-xl bg-yellow-50 p-4 sm:p-5">
              <p className="text-sm text-gray-500 sm:text-base">
                Highest Expense
              </p>

              <p className="mt-2 break-words text-2xl font-bold text-yellow-600 sm:text-3xl">
                ₹{Number(insights.highestExpense ?? 0).toLocaleString("en-IN")}
              </p>
            </div>

            {/* AI Suggestion */}
            <div className="rounded-xl bg-green-50 p-4 sm:col-span-2 sm:p-5">
              <p className="text-sm text-gray-500 sm:text-base">
                AI Suggestion
              </p>

              <p className="mt-2 text-base leading-7 text-green-700 sm:text-lg sm:leading-8">
                {insights.suggestion || "No suggestion available."}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 sm:text-base">
            No insights available.
          </p>
        )}
      </div>

      {/* CHAT */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {/* Messages */}
        <div className="h-[55vh] min-h-[350px] max-h-[500px] overflow-y-auto p-4 sm:h-[450px] sm:p-6">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">
              <p className="text-sm text-gray-400 sm:text-base">
                Start chatting with your AI Assistant...
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] break-words rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[80%] sm:px-5 sm:py-3 sm:text-base ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">AI is thinking...</p>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t p-3 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask your AI Assistant..."
              className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm text-black outline-none transition focus:border-blue-500 sm:text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-8"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    if (!question.trim()) return;

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
    <div className="space-y-8 p-8">
      <PageHeader
        title="AI Assistant"
        subtitle="Ask anything about your finances."
      />

      {/* SUMMARY */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-gray-500">Total Income</h3>

          <p className="mt-3 text-3xl font-bold text-green-600">
            ₹{summary?.totalIncome ?? 0}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-gray-500">Total Expense</h3>

          <p className="mt-3 text-3xl font-bold text-red-600">
            ₹{summary?.totalExpense ?? 0}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-gray-500">Savings</h3>

          <p className="mt-3 text-3xl font-bold text-blue-600">
            ₹{summary?.savings ?? summary?.balance ?? 0}
          </p>
        </div>
      </div>

      {/* AI INSIGHTS */}

      <div className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-bold">AI Insights</h2>

        {insights ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-xl bg-blue-50 p-5">
              <p className="text-gray-500">Average Expense</p>

              <p className="mt-2 text-3xl font-bold text-blue-600">
                ₹{insights.averageExpense}
              </p>
            </div>

            <div className="rounded-xl bg-red-50 p-5">
              <p className="text-gray-500">Highest Category</p>

              <p className="mt-2 text-3xl font-bold text-red-600">
                {insights.highestCategory}
              </p>
            </div>

            <div className="rounded-xl bg-yellow-50 p-5">
              <p className="text-gray-500">Highest Expense</p>

              <p className="mt-2 text-3xl font-bold text-yellow-600">
                ₹{insights.highestExpense}
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-5 md:col-span-2">
              <p className="text-gray-500">AI Suggestion</p>

              <p className="mt-2 text-2xl text-green-700">
                {insights.suggestion}
              </p>
            </div>
          </div>
        ) : (
          <p>No insights available.</p>
        )}
      </div>

      {/* CHAT */}

      <div className="rounded-2xl bg-white shadow">
        <div className="h-[450px] overflow-y-auto p-6">
          {messages.length === 0 ? (
            <p className="text-gray-400">
              Start chatting with your AI Assistant...
            </p>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 ${
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

          {loading && <p className="text-gray-500">AI is thinking...</p>}
        </div>

        <div className="flex gap-3 border-t p-5">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your AI Assistant..."
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-black outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

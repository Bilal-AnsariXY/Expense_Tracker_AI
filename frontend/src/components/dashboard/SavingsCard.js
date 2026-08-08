"use client";

export default function SavingsCard({ data }) {
  if (!data) return null;

  const savings = Number(data.Savings || 0);
  const savingPercentage = Number(data.SavingPercentage || 0);
  const income = Number(data.Income || 0);
  const expense = Number(data.Expense || 0);

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
            Savings Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Your current financial health
          </p>
        </div>

        <div className="flex-shrink-0 rounded-2xl bg-green-100 p-3 text-3xl sm:p-4 sm:text-4xl">
          💰
        </div>
      </div>

      {/* Total Savings */}
      <div className="mb-6 sm:mb-8">
        <p className="text-sm text-gray-500 sm:text-base">Total Savings</p>

        <h1 className="mt-2 break-words text-3xl font-bold text-green-600 sm:text-4xl lg:text-5xl">
          ₹{savings.toLocaleString("en-IN")}
        </h1>
      </div>

      {/* Savings Rate */}
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-gray-700 sm:text-base">
          Savings Rate
        </span>

        <span className="text-sm font-bold text-green-600 sm:text-base">
          {savingPercentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 h-3 w-full overflow-hidden rounded-full bg-gray-200 sm:mb-8">
        <div
          className="h-3 rounded-full bg-green-500 transition-all duration-700"
          style={{
            width: `${Math.min(Math.max(savingPercentage, 0), 100)}%`,
          }}
        />
      </div>

      {/* Income / Expense */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Income */}
        <div className="rounded-xl bg-green-50 p-4 sm:p-5">
          <p className="text-sm text-gray-500">Income</p>

          <h3 className="mt-1 break-words text-xl font-bold text-green-700 sm:text-2xl">
            ₹{income.toLocaleString("en-IN")}
          </h3>
        </div>

        {/* Expense */}
        <div className="rounded-xl bg-red-50 p-4 sm:p-5">
          <p className="text-sm text-gray-500">Expense</p>

          <h3 className="mt-1 break-words text-xl font-bold text-red-600 sm:text-2xl">
            ₹{expense.toLocaleString("en-IN")}
          </h3>
        </div>
      </div>
    </div>
  );
}

"use client";

export default function SavingsCard({ data }) {
  if (!data) return null;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Savings Overview</h2>

          <p className="text-gray-500">Your current financial health</p>
        </div>

        <div className="rounded-2xl bg-green-100 p-4 text-4xl">💰</div>
      </div>

      <div className="mb-8">
        <p className="text-gray-500">Total Savings</p>

        <h1 className="mt-2 text-5xl font-bold text-green-600">
          ₹{data.Savings.toLocaleString()}
        </h1>
      </div>

      <div className="mb-3 flex justify-between">
        <span className="font-medium text-gray-700">Savings Rate</span>

        <span className="font-bold text-green-600">
          {data.SavingPercentage}%
        </span>
      </div>

      <div className="mb-8 h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-green-500 transition-all duration-700"
          style={{
            width: `${data.SavingPercentage}%`,
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-green-50 p-4">
          <p className="text-sm text-gray-500">Income</p>

          <h3 className="mt-1 text-xl font-bold text-green-700">
            ₹{data.Income.toLocaleString()}
          </h3>
        </div>

        <div className="rounded-xl bg-red-50 p-4">
          <p className="text-sm text-gray-500">Expense</p>

          <h3 className="mt-1 text-xl font-bold text-red-600">
            ₹{data.Expense.toLocaleString()}
          </h3>
        </div>
      </div>
    </div>
  );
}

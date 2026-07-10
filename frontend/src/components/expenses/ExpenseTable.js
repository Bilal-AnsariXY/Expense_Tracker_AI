"use client";

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700">
          No Expenses Found
        </h2>

        <p className="mt-2 text-gray-500">
          Start by adding your first expense.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md">
      <table className="min-w-full">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Date</th>

            <th className="px-6 py-4 text-left">Category</th>

            <th className="px-6 py-4 text-left">Description</th>

            <th className="px-6 py-4 text-right">Amount</th>

            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.ExpenseId} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-800">
                {new Date(expense.ExpenseDate).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 font-medium text-gray-800">
                {expense.CategoryName}
              </td>

              <td className="px-6 py-4 text-gray-800">{expense.Description}</td>

              <td className="px-6 py-4 text-right font-semibold text-red-600">
                ₹{Number(expense.Amount).toLocaleString()}
              </td>

              <td className="space-x-2 px-6 py-4 text-center">
                <button
                  onClick={() => onEdit(expense)}
                  className="rounded-lg bg-yellow-400 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(expense)}
                  className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

export default function IncomeTable({ income, onEdit, onDelete }) {
  if (!income || income.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700">
          No Income Found
        </h2>

        <p className="mt-2 text-gray-500">Start by adding your first income.</p>
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
          {income.map((item) => (
            <tr key={item.IncomeId} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-800">
                {new Date(item.IncomeDate).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 font-medium text-gray-800">
                {item.CategoryName}
              </td>

              <td className="px-6 py-4 text-gray-800">{item.Description}</td>

              <td className="px-6 py-4 text-right font-semibold text-green-600">
                ₹{Number(item.Amount).toLocaleString()}
              </td>

              <td className="space-x-2 px-6 py-4 text-center">
                <button
                  onClick={() => onEdit(item)}
                  className="rounded-lg bg-yellow-400 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(item)}
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

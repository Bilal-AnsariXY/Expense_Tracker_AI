"use client";

export default function IncomeTable({ income, onEdit, onDelete }) {
  if (!income || income.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800">No Income Found</h3>

        <p className="mt-2 text-gray-500">Start by adding your first income.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-sm">
      {/* Horizontal scrolling on small screens */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[750px] w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="whitespace-nowrap text-gray-700 px-4 py-4 text-left sm:px-6">
                Date
              </th>

              <th className="whitespace-nowrap text-gray-700 px-4 py-4 text-left sm:px-6">
                Category
              </th>

              <th className="whitespace-nowrap text-gray-700 px-4 py-4 text-left sm:px-6">
                Description
              </th>

              <th className="whitespace-nowrap text-gray-700 px-4 py-4 text-right sm:px-6">
                Amount
              </th>

              <th className="whitespace-nowrap text-gray-700 px-4 py-4 text-center sm:px-6">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {income.map((item) => (
              <tr
                key={item.IncomeId}
                className="border-b transition hover:bg-gray-50"
              >
                <td className="whitespace-nowrap px-4 py-4 text-gray-800 sm:px-6">
                  {new Date(item.IncomeDate).toLocaleDateString("en-IN")}
                </td>

                <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-800 sm:px-6">
                  {item.CategoryName}
                </td>

                <td className="max-w-[250px] truncate px-4 py-4 text-gray-800 sm:px-6">
                  {item.Description}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-right font-semibold text-green-600 sm:px-6">
                  ₹{Number(item.Amount).toLocaleString("en-IN")}
                </td>

                <td className="px-4 py-4 sm:px-6">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="rounded-lg bg-yellow-400 px-3 py-2 text-sm font-medium text-white transition hover:bg-yellow-500"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(item)}
                      className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile hint */}
      <div className="border-t bg-gray-50 px-4 py-2 text-center text-xs text-gray-500 sm:hidden">
        ← Swipe horizontally to see all columns →
      </div>
    </div>
  );
}

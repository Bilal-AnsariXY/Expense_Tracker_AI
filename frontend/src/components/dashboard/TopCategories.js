"use client";

import { useSelector } from "react-redux";

export default function TopCategories() {
  const { category } = useSelector((state) => state.dashboard);

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <h2 className="mb-5 text-xl font-bold text-gray-800 sm:mb-6 sm:text-2xl">
        Top Categories
      </h2>

      {category.length === 0 ? (
        <p className="text-sm text-gray-500 sm:text-base">
          No categories found.
        </p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {category.map((item) => (
            <div
              key={item.categoryname}
              className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50 sm:p-4"
            >
              {/* Category name */}
              <span className="min-w-0 break-words text-sm font-semibold text-gray-800 sm:text-base">
                {item.categoryname}
              </span>

              {/* Amount */}
              <span className="flex-shrink-0 whitespace-nowrap text-sm font-bold text-blue-600 sm:text-base">
                ₹{Number(item.totalexpense).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useSelector } from "react-redux";

export default function TopCategories() {
  const { category } = useSelector((state) => state.dashboard);

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Top Categories</h2>

      {category.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <div className="space-y-4">
          {category.map((item) => (
            <div
              key={item.categoryname}
              className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50"
            >
              <span className="font-semibold text-gray-800">
                {item.categoryname}
              </span>

              <span className="font-bold text-blue-600">
                ₹{Number(item.totalexpense).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

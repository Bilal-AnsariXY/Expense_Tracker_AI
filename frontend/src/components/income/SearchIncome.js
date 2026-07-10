"use client";

export default function SearchIncome({ search, setSearch }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search income..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
}

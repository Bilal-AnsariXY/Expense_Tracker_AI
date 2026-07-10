"use client";

export default function ExpenseModal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

          <button
            onClick={onClose}
            className="text-3xl font-light text-gray-500 transition hover:text-red-500"
          >
            ×
          </button>
        </div>

        {/* Body */}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

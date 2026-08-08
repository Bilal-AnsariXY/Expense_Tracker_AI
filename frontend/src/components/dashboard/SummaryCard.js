export default function SummaryCard({ title, value, icon, color }) {
  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        {/* Text */}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-500 sm:text-base">
            {title}
          </p>

          <h2 className="mt-2 break-words text-2xl font-bold text-gray-900 sm:mt-3 sm:text-3xl">
            {value}
          </h2>
        </div>

        {/* Icon */}
        <div
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl sm:h-16 sm:w-16 ${color}`}
        >
          <span className="text-2xl sm:text-3xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}

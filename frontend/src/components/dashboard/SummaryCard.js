export default function SummaryCard({ title, value, icon, color }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900">{value}</h2>
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color}`}
        >
          <span className="text-3xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}

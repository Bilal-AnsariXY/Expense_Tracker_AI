"use client";

export default function PageHeader({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>

        <p className="mt-2 text-gray-500">{subtitle}</p>
      </div>

      {buttonText && (
        <button
          onClick={onButtonClick}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

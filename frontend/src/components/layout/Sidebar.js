"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "📊",
    },
    {
      name: "Expenses",
      href: "/expenses",
      icon: "💸",
    },
    {
      name: "Income",
      href: "/income",
      icon: "💰",
    },
    {
      name: "AI Assistant",
      href: "/ai",
      icon: "🤖",
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-slate-900 p-3 text-xl text-white shadow-lg md:hidden"
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col
          bg-slate-900 text-white shadow-xl
          transition-transform duration-300
          md:static md:z-auto md:translate-x-0 md:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="border-b border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-wide">Expense AI</h1>

              <p className="mt-2 text-sm text-slate-400">
                Smart Expense Tracker
              </p>
            </div>

            {/* Close button - mobile only */}
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-xl text-slate-300 hover:bg-slate-800 hover:text-white md:hidden"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                      active
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>

                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-700 p-6">
          <p className="text-center text-xs text-slate-500">Expense AI v1.0</p>

          <p className="mt-1 text-center text-xs text-slate-600">
            © 2026 Bilal Ansari
          </p>
        </div>
      </aside>
    </>
  );
}

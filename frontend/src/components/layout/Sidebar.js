"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

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
    <aside className="flex h-screen w-64 flex-col bg-slate-900 text-white shadow-xl">
      {/* Logo */}

      <div className="border-b border-slate-700 p-6">
        <h1 className="text-3xl font-bold tracking-wide">Expense AI</h1>

        <p className="mt-2 text-sm text-slate-400">Smart Expense Tracker</p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
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
  );
}

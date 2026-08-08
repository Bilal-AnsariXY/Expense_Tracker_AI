"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { logout } from "../../store/slices/authSlice";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(logout());

    setOpen(false);

    router.replace("/");
  };

  return (
    <header className="flex min-h-[80px] items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-3 shadow-sm sm:px-6 lg:px-8">
      {/* Left */}
      <div className="min-w-0 pl-12 md:pl-0">
        <h2 className="truncate text-xl font-bold text-gray-800 sm:text-2xl">
          Dashboard
        </h2>

        <p className="truncate text-xs text-gray-500 sm:text-sm">{today}</p>
      </div>

      {/* Right */}
      <div ref={dropdownRef} className="relative flex-shrink-0">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-100 sm:gap-4 sm:p-2"
        >
          {/* User information */}
          <div className="hidden text-right sm:block">
            <p className="text-xs text-gray-500 sm:text-sm">Welcome Back</p>

            <h3 className="max-w-[180px] truncate font-semibold text-gray-800">
              {user?.name || "User"}
            </h3>
          </div>

          {/* Profile image */}
          <img
            src={
              user?.profilepicture ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.name || "User",
              )}`
            }
            alt={user?.name || "Profile"}
            className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover sm:h-12 sm:w-12"
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-full z-50 mt-3 w-[calc(100vw-2rem)] max-w-64 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl">
            <div className="border-b pb-3">
              <p className="truncate font-semibold text-gray-800">
                {user?.name || "User"}
              </p>

              <p className="truncate text-sm text-gray-500">
                {user?.email || ""}
              </p>
            </div>

            <div className="mt-3 space-y-2">
              <button
                className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                👤 Profile
              </button>

              <button
                className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                ⚙️ Settings
              </button>

              <button
                onClick={handleLogout}
                className="w-full rounded-lg px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

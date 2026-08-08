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
  console.log("Logout clicked");

  console.log("Before remove:");
  console.log("Token:", localStorage.getItem("token"));
  console.log("User:", localStorage.getItem("user"));

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  console.log("After remove:");
  console.log("Token:", localStorage.getItem("token"));
  console.log("User:", localStorage.getItem("user"));

  dispatch(logout());

  setOpen(false);

  router.replace("/");
};

  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
      {/* Left */}

      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

        <p className="text-sm text-gray-500">{today}</p>
      </div>

      {/* Right */}

      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-4 rounded-xl p-2 transition hover:bg-gray-100"
        >
          <div className="text-right">
            <p className="text-sm text-gray-500">Welcome Back</p>

            <h3 className="font-semibold text-gray-800">
              {user?.name || "User"}
            </h3>
          </div>

          <img
            src={
              user?.profilepicture || "https://ui-avatars.com/api/?name=User"
            }
            alt="Profile"
            className="h-12 w-12 rounded-full border-2 border-gray-300"
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-64 rounded-2xl border bg-white p-3 shadow-xl">
            <div className="border-b pb-3">
              <p className="font-semibold text-gray-800">{user?.name}</p>

              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            <div className="mt-3 space-y-2">
              <button className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-100">
                👤 Profile
              </button>

              <button className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-100">
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



"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      window.location.replace("/dashboard");
    } else {
      window.location.replace(
        `${process.env.NEXT_PUBLIC_EXPRESS_API}/auth/google`,
      );
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <h2 className="text-xl font-semibold">Loading...</h2>
    </div>
  );
}
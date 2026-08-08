"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

import { loginSuccess } from "../../../store/slices/authSlice";

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    const user = searchParams.get("user");

    if (!token || !user) {
      router.push("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(decodeURIComponent(user));

      // Save token
      localStorage.setItem("token", token);

      // Save user
      localStorage.setItem("user", JSON.stringify(parsedUser));

      // Save in Redux
      dispatch(
        loginSuccess({
          token,
          user: parsedUser,
        }),
      );

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to process login:", error);
      router.push("/");
    }
  }, [dispatch, router, searchParams]);

  return <div>Logging you in...</div>;
}

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<div>Logging you in...</div>}>
      <AuthSuccessContent />
    </Suspense>
  );
}

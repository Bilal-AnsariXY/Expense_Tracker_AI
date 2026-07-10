"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

import { loginSuccess } from "../../../store/slices/authSlice";

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    const user = searchParams.get("user");

    if (!token || !user) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(decodeURIComponent(user));

    // Save token
    localStorage.setItem("token", token);

    // Save user (THIS WAS MISSING)
    localStorage.setItem("user", JSON.stringify(parsedUser));

    // Save in Redux
    dispatch(
      loginSuccess({
        token,
        user: parsedUser,
      }),
    );

    // Redirect
    router.push("/dashboard");
  }, [dispatch, router, searchParams]);

  return <h1>Logging you in...</h1>;
}

"use client";

import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { ScreenLoader } from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Dashboard from "./dashboard/page";

export default function Home() {
  // TODO: Example usage (remove it later)
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (loading) {
    return <ScreenLoader />;
  }

  if (!user) {
    return;
  }

  return (
    <Dashboard />
  )
}

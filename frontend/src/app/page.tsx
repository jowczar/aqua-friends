"use client";

import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { ScreenLoader } from "@/components/Loader";
import Dashboard from "./dashboard/page";

export default function Home() {
  // TODO: Example usage (remove it later)
  // TODO: this ideally should be handled via provider (or middleware if applies to no-SSR apps)
  // rn it does not matter but once we start implementing logic
  // remember to make sure that the user is logged in
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

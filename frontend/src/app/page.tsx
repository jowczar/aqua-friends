"use client";

import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { ScreenLoader } from "@/components/Loader";

export default function Home() {
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
    <div>Home page</div>
  )
}

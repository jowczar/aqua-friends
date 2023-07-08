"use client";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

import FileUploaderProvider from "@/context/FileUploaderProvider";
import Loader from "@/components/Loader";
import { UserData } from "@/common/types";
import Form from "./form";

export default function Settings() {
  const auth = getAuth();
  const [user, setUser] = useState<UserData | null>(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser({
        email: user.email || "",
        displayName: user.displayName || "",
        photoUrl: user.photoURL || "",
      });
    } else {
      setUser(null);
    }
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center mx-auto bg-white px-12 py-8 rounded shadow my-10 max-w-2xl">
        <Loader />
      </div>
    );
  }

  return (
    <FileUploaderProvider defaultImage={user.photoUrl || "/man.png"}>
      <Form displayName={user.displayName} email={user.email} />
    </FileUploaderProvider>
  );
}

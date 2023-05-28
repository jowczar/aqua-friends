"use client";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FileUploaderProvider from "@/context/FileUploaderProvider";
import { FormInputImage } from "@/components/Form/FormField";
import useFileUploader from "@/hooks/useFileUploader";

import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/Loader";

type UserData = {
  email: string;
  displayName: string;
  photoUrl: string;
};

const Form = () => {
  const { control, handleSubmit } = useForm<UserData>({ mode: "onBlur" });
  const [loading, setLoading] = useState(false);
  const { uploadFile } = useFileUploader();
  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const url = await uploadFile();
    setLoading(false);
  });

  // TODO: add loading
  // TODO: add whole form
  // TODO: implement changes in firebase (getAuth() has all the needed methods)

  return (
    <form onSubmit={onSubmit}>
      <FormInputImage name="avatar" control={control} />
      <input
        type="submit"
        className="bg-primary rounded px-4 py-2 text-white text-sm cursor-pointer"
        value="Save profile"
      />
    </form>
  );
};

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
    return <Loader />;
  }

  return (
    <FileUploaderProvider defaultImage="man.png">
      <Form />
    </FileUploaderProvider>
  );
}

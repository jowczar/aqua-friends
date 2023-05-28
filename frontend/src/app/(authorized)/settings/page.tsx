"use client";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import FileUploaderProvider from "@/context/FileUploaderProvider";
import {
  FormInputImage,
  FormInputSubmit,
  FormInputText,
} from "@/components/Form/FormField";
import useFileUploader from "@/hooks/useFileUploader";
import Loader from "@/components/Loader";

import "react-toastify/dist/ReactToastify.css";
import { UserData } from "@/common/types";

const formSchema = Yup.object().shape({
  displayName: Yup.string()
    .min(3, "Name is too short")
    .max(30, "Name is too long")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(
    6,
    "Password length should be at least 6 characters"
  ),
  passwordConfirm: Yup.string()
    .min(6, "Password length should be at least 6 characters")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

const Form = ({ email, displayName }: Omit<UserData, "photoUrl">) => {
  const { control, handleSubmit } = useForm<UserData>({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
    defaultValues: {
      email,
      displayName,
    },
  });
  const { uploadFile } = useFileUploader();
  const onSubmit = handleSubmit(async (data) => {
    console.log({ data });
    if (data.photoUrl) {
      console.log("Uploading");
      const url = await uploadFile();
      console.log("Uploaded", { url });
    }

    await new Promise((res) => setTimeout(() => res(null), 2000));
  });

  // TODO: implement changes in firebase (getAuth() has all the needed methods)

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col md:flex-row gap-10 items-center mx-auto bg-white px-12 py-8 rounded shadow my-10 max-w-2xl"
    >
      <div className="grow flex gap-4 flex-col order-2 md:order-1 w-full">
        <FormInputText
          name="displayName"
          type="text"
          control={control}
          label="Display name"
        />
        <FormInputText
          name="email"
          type="email"
          autocomplete={false}
          control={control}
          label="Email"
        />
        <FormInputText
          name="password"
          type="password"
          autocomplete={false}
          control={control}
          label="Password"
        />
        <FormInputText
          name="passwordConfirm"
          type="password"
          control={control}
          autocomplete={false}
          label="Confirm password"
        />
        <FormInputSubmit name="submit" control={control} onClick={onSubmit}>
          Save profile
        </FormInputSubmit>
      </div>
      <div className="shrink-0 order-1 md:order-2">
        <FormInputImage
          name="photoUrl"
          className="w-40 h-40 md:w-60 md:h-60 aspect-square"
          control={control}
        />
      </div>
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
    return (
      <div className="flex items-center justify-center mx-auto bg-white px-12 py-8 rounded shadow my-10 max-w-2xl">
        <Loader />
      </div>
    );
  }

  return (
    <FileUploaderProvider defaultImage={user.photoUrl || "man.png"}>
      <Form displayName={user.displayName} email={user.email} />
    </FileUploaderProvider>
  );
}

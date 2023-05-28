import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string as yupString, ref } from "yup";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  User,
  getAuth,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";

import {
  FormInputImage,
  FormInputSubmit,
  FormInputText,
} from "@/components/Form/FormField";
import useFileUploader from "@/hooks/useFileUploader";
import { UserData } from "@/common/types";
import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";

const formSchema = object().shape({
  displayName: yupString()
    .min(3, "Name is too short")
    .max(30, "Name is too long")
    .required("Name is required"),
  email: yupString().email("Invalid email").required("Email is required"),
  password: yupString().min(
    6,
    "Password length should be at least 6 characters"
  ),
  passwordConfirm: yupString()
    .oneOf([ref("password")], "Passwords must match")
    .when("password", {
      is: (password: string) => password?.length > 0,
      then: (schema) => schema.required("Password confirmation is required"),
      otherwise: (schema) => schema,
    }),
});

const handleFirebaseError = (error: FirebaseError) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "Email already in use";
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/weak-password":
      return "Password is too weak";
    case "auth/wrong-password":
      return "Wrong password";
    case "auth/missing-password":
      return "Please enter your current password";
    case "auth/too-many-requests":
      return "Too many requests. Try again later";
    default:
      return "Something went wrong";
  }
};

const Form = ({ email, displayName }: Omit<UserData, "photoUrl">) => {
  const [needsReauthentication, setNeedsReauthentication] = useState(false);
  const { uploadFile } = useFileUploader();
  const { control, watch, handleSubmit } = useForm<
    UserData & { password: string; currentPassword: string }
  >({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
    defaultValues: {
      email,
      displayName,
    },
  });
  const watchPassword = watch("password");
  const watchCurrentPassword = watch("currentPassword");
  const watchEmail = watch("email");

  const reauthenticate = (user: User) => {
    const provider = user.providerData[0].providerId;
    if (!user.email) return Promise.reject("User has no email set");

    if (provider === "password") {
      return reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email, watchCurrentPassword)
      );
    }

    return reauthenticateWithPopup(user, new GoogleAuthProvider());
  };

  const onSubmit = handleSubmit(async (data) => {
    const user = getAuth().currentUser;
    if (!user) return toast.error("User not logged in");

    let url = user.photoURL;
    if (data.photoUrl) {
      url = await uploadFile();
    }

    try {
      // Firebase requires reauthentication before updating email or password for security reasons
      if (user.email !== data.email || data.password) {
        await reauthenticate(user);
        await updateEmail(user, data.email);
        await updatePassword(user, data.password);
      }

      await updateProfile(user, {
        displayName: data.displayName,
        photoURL: url || user.photoURL,
      });

      toast.success("Profile updated!");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(handleFirebaseError(error));
        console.error(error);
      } else {
        toast.error("Something went wrong");
        console.error(error);
      }
    }
  });

  useEffect(() => {
    setNeedsReauthentication(watchPassword !== "" || watchEmail !== email);
  }, [watchPassword, watchEmail, email]);

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
          label="New password"
        />
        <FormInputText
          name="passwordConfirm"
          type="password"
          control={control}
          autocomplete={false}
          label="Confirm password"
        />
        {needsReauthentication && (
          <div className="border-t pt-4 transition ease-out transform origin-top-right">
            <FormInputText
              name="currentPassword"
              type="password"
              autocomplete={false}
              control={control}
              label="Current password"
            />
            <div className="mt-3 text-xs text-gray-500 leading-tight">
              Enter your current password to change your email or password
            </div>
          </div>
        )}
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

export default Form;

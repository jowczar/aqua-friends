import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FirebaseError } from "firebase/app";
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
import { UserData, UserDetails } from "@/common/types";
import { handleFirebaseError } from "@/common/firebase";
import { formSchema } from "./schema";
import useFirestore from "@/hooks/useFirestore";
import { doc, setDoc } from "firebase/firestore";

type SettingsFormValues = UserData & {
  password: string;
  passwordConfirm: string;
  currentPassword: string;
  submit: boolean;
};

const Form = ({ email, displayName }: Omit<UserData, "photoUrl">) => {
  const [needsReauthentication, setNeedsReauthentication] = useState(false);
  const { uploadFile } = useFileUploader();
  const firestore = useFirestore();
  const { control, watch, handleSubmit } = useForm<SettingsFormValues>({
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

  const updateUserDetails = (
    uid: string,
    userDetails: Omit<UserDetails, "id" | "admin">
  ) => {
    const userRef = doc(firestore, "users", uid);
    setDoc(userRef, userDetails, { merge: true });
  };

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

      if (url)
        updateUserDetails(user.uid, {
          avatar: url,
          username: data.displayName,
          email: data.email,
        });

      toast.success("Profile updated!");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(handleFirebaseError(error));
      } else {
        toast.error("Something went wrong");
        console.error(error);
      }
    }
  });

  useEffect(() => {
    setNeedsReauthentication(!!watchPassword || watchEmail !== email);
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
          autocomplete={false}
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
          <div className="border-t pt-4">
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

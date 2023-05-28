import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, ref } from "yup";

import {
  FormInputImage,
  FormInputSubmit,
  FormInputText,
} from "@/components/Form/FormField";
import useFileUploader from "@/hooks/useFileUploader";
import { UserData } from "@/common/types";
import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";

const formSchema = object().shape({
  displayName: string()
    .min(3, "Name is too short")
    .max(30, "Name is too long")
    .required("Name is required"),
  email: string().email("Invalid email").required("Email is required"),
  password: string().min(6, "Password length should be at least 6 characters"),
  passwordConfirm: string()
    .oneOf([ref("password")], "Passwords must match")
    .when("password", {
      is: (password: string) => password?.length > 0,
      then: (schema) => schema.required("Password confirmation is required"),
      otherwise: (schema) => schema,
    }),
});

const Form = ({ email, displayName }: Omit<UserData, "photoUrl">) => {
  const { control, handleSubmit } = useForm<UserData & { password: string }>({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
    defaultValues: {
      email,
      displayName,
    },
  });
  const { uploadFile } = useFileUploader();
  const onSubmit = handleSubmit(async (data) => {
    const user = getAuth().currentUser;
    if (!user) return toast.error("User not logged in");

    let url = user.photoURL;
    if (data.photoUrl) {
      url = await uploadFile();
    }

    try {
      await updateEmail(user, data.email);
      await updatePassword(user, data.password);
      await updateProfile(user, {
        displayName: data.displayName,
        photoURL: url || user.photoURL,
      });
      toast.success("Profile updated!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  });

  // TODO: fix typescript control type warning

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

export default Form;

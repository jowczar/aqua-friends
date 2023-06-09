import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

import { FormInputSubmit, FormInputText } from "@/components/Form/FormField";
import { UserData } from "@/common/types";
import { formSchema } from "./schema";

type AdminFormValues = UserData & {
  password: string;
  passwordConfirm: string;
  submit: boolean;
};

const Form = () => {
  const { control, handleSubmit } = useForm<AdminFormValues>({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    // TODO: POST /users

    const user = getAuth().currentUser;
    if (!user) return toast.error("User not logged in");

    try {
      toast.success("Profile updated!");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col md:flex-row gap-10 items-center mx-auto bg-white rounded mt-8 max-w-2xl"
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
        <div className="flex items-center pt-4 space-x-2">
          <FormInputSubmit
            name="submit"
            control={control}
            onClick={onSubmit}
            data-modal-hide="staticModal"
          >
            Save new admin
          </FormInputSubmit>
        </div>
      </div>
    </form>
  );
};

export default Form;

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormInputSubmit, FormInputText } from "@/components/Form/FormField";
import { UserData } from "@/common/types";
import { formSchema } from "./schema";
import useUserWithRole from "@/hooks/useUserWithRole";

type AdminFormValues = UserData & {
  password: string;
  passwordConfirm: string;
  submit: boolean;
};

type AdminModalForm = {
  onSubmit: (data: AdminFormValues) => void;
};

const Form = ({ onSubmit }: AdminModalForm) => {
  const { control, handleSubmit } = useForm<AdminFormValues>({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });
  const { idToken } = useUserWithRole();

  const onInternalSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      toast.success("Administrator added!");
      onSubmit(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }

      console.error(error);
    }
  });

  return (
    <form
      onSubmit={onInternalSubmit}
      className="flex flex-col md:flex-row gap-10 items-center mx-auto bg-white rounded mt-8 mb-2 max-w-2xl"
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
            onClick={onInternalSubmit}
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

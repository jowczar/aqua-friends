import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormInputImage, FormInputSubmit, FormInputText } from "@/components/Form/FormField";
import { formSchema } from "./schema";
import { Fish } from "../../creator/AquaLifePage";
import FileUploaderProvider from "@/context/FileUploaderProvider";

type FishFormValues = Fish & {
  submit: boolean;
}

type FishModalForm = {
  onSubmit: () => void;
};

const Form = ({ onSubmit }: FishModalForm) => {
  const { control, handleSubmit } = useForm<FishFormValues>({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const onInternalSubmit = handleSubmit(async (data) => {
    // Save fish


    onSubmit();
  });

  return (
    <FileUploaderProvider defaultImage={false || "/no-fish.png"}>
      <form
        onSubmit={onInternalSubmit}
        className="flex flex-col md:flex-row gap-10 items-center mx-auto bg-white rounded mt-8 mb-2 max-w-2xl"
      >
        <div className="grow flex gap-4 flex-col order-2 md:order-1 w-full">
          <FormInputImage
            name="image"
            control={control}
            label="Image"
            className="w-20 h-20 md:w-40 md:h-40 aspect-square"
          />
          <FormInputText
            name="name"
            type="text"
            control={control}
            label="Name"
            autocomplete={false}
          />
          <FormInputText
            name="species"
            type="text"
            control={control}
            label="Species"
            autocomplete={false}
          />
          <FormInputText
            name="requirements.water"
            type="text"
            control={control}
            label="Water type"
            autocomplete={false}
          />
          <div className="flex items-center pt-4 space-x-2">
            <FormInputSubmit
              name="submit"
              control={control}
              onClick={onInternalSubmit}
              data-modal-hide="staticModal"
            >
              Save new fish
            </FormInputSubmit>
          </div>
        </div>
      </form>
    </FileUploaderProvider>
  );
};

export default Form;

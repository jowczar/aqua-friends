import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormInputImage, FormInputSubmit, FormInputText } from "@/components/Form/FormField";
import { formSchema } from "./schema";
import { Fish } from "../../creator/AquaLifePage";
import FileUploaderProvider from "@/context/FileUploaderProvider";
import { Equipment } from "../../creator/page";

type EquipmentFormValues = Equipment & {
  submit: boolean;
}

type EquipmentModalForm = {
  onSubmit: () => void;
};

const Form = ({ onSubmit }: EquipmentModalForm) => {
  const { control, handleSubmit } = useForm<EquipmentFormValues>({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const onInternalSubmit = handleSubmit(async (data) => {
    // Save equipment


    onSubmit();
  });

  return (
    <FileUploaderProvider defaultImage={false || "/no-equipment.png"}>
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
            name="width"
            type="text"
            control={control}
            label="Width"
            autocomplete={false}
          />
          <FormInputText
            name="length"
            type="text"
            control={control}
            label="Length"
            autocomplete={false}
          />
          <FormInputText
            name="height"
            type="text"
            control={control}
            label="Height"
            autocomplete={false}
          />
          <FormInputText
            name="water"
            type="text"
            control={control}
            label="Water type"
            autocomplete={false}
          />
          <FormInputText
            name="equipmentType"
            type="text"
            control={control}
            label="Equipment type"
            autocomplete={false}
          />
          <div className="flex items-center pt-4 space-x-2">
            <FormInputSubmit
              name="submit"
              control={control}
              onClick={onInternalSubmit}
              data-modal-hide="staticModal"
            >
              Save new equipment
            </FormInputSubmit>
          </div>
        </div>
      </form>
    </FileUploaderProvider>
  );
};

export default Form;

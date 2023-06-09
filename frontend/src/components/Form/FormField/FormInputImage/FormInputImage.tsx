import React, { ChangeEvent } from "react";
import { Controller } from "react-hook-form";
import Image from "next/image";

import { FormInputProps } from "@/common/types";
import useFileUploader from "@/hooks/useFileUploader";
import CropperModal from "./CropperModal";

const FormInputImage = <TFormValues extends Record<string, unknown>>({
  name,
  control,
  rules,
  label,
  className,
}: FormInputProps<TFormValues>): JSX.Element => {
  const { defaultImage, imageToUpload, setImageToUpload } = useFileUploader();
  const [isCropperOpen, setIsCropperOpen] = React.useState(false);
  const [internalImage, setInternalImage] = React.useState<string>(
    imageToUpload ? URL.createObjectURL(imageToUpload) : defaultImage
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    if (!input.files?.length) return;
    setInternalImage(URL.createObjectURL(input.files[0]));
  };

  const onCrop = (canvas: HTMLCanvasElement) => {
    setIsCropperOpen(false);

    canvas.toBlob((blob) => {
      const file = new File([blob as BlobPart], "fileName.jpg", {
        type: "image/jpeg",
      });
      setImageToUpload(file);
      setInternalImage(URL.createObjectURL(file));
    }, "image/jpeg");
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <label htmlFor={name} className="flex flex-col gap-1 w-fit">
          {label && <span className="text-xs font-semibold">{label}</span>}
          <div className="group cursor-pointer relative rounded-full w-fit">
            <Image
              src={internalImage}
              alt="avatar"
              width={16}
              height={16}
              className={`w-24 h-24 rounded-full transition group-hover:brightness-50 shadow duration-300 ${className}`}
            />
            <Image
              src="/pencil.svg"
              alt="change avatar"
              height={24}
              width={24}
              className="invert w-1/4 hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <input
            id={name}
            type="file"
            value={value as string}
            className="hidden"
            accept="image/png,image/jpeg"
            onChange={(e) => {
              handleFileChange(e);
              setIsCropperOpen(true);
            }}
          />
          {error && (
            <span className="text-red-500 text-xs">{error?.message}</span>
          )}
          <CropperModal
            isOpen={isCropperOpen}
            setIsOpen={setIsCropperOpen}
            image={internalImage}
            onSubmit={onCrop}
          />
        </label>
      )}
    />
  );
};

export default FormInputImage;

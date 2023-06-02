import React, { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { FormInputProps } from "@/common/types";
import classNames from "classnames";
import Loader from "@/components/Loader";

type FormInputSubmitProps<TFormValues extends FieldValues> =
  FormInputProps<TFormValues> & {
    children: React.ReactNode;
    onClick: () => Promise<void>;
  };

const FormInputSubmit = <TFormValues extends Record<string, unknown>>({
  name,
  control,
  rules,
  onClick,
  children,
  className,
}: FormInputSubmitProps<TFormValues>) => {
  const [loading, setLoading] = useState(false);

  const internalOnClick = () => {
    setLoading(true);
    onClick().finally(() => setLoading(false));
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={() => (
        <button
          id={name}
          onClick={internalOnClick}
          disabled={loading}
          type="submit"
          className={classNames(
            "bg-primary rounded px-4 py-2 text-white text-xs cursor-pointer transition w-full",
            "hover:bg-[#2644a8] active:bg-[#2644a8]",
            loading && "opacity-75 disabled:cursor-not-allowed",
            className
          )}
        >
          {!loading && children}
          {loading && <Loader className="h-4" />}
        </button>
      )}
    />
  );
};

export default FormInputSubmit;

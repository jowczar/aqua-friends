import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { FormInputProps } from "@/common/types";
import classNames from "classnames";

type FormInputTextProps<TFormValues extends FieldValues> =
  FormInputProps<TFormValues> & {
    type: string;
    autocomplete: boolean;
  };

const FormInputText = <TFormValues extends FieldValues>({
  name,
  control,
  rules,
  label,
  autocomplete = true,
  type = "text",
}: FormInputTextProps<TFormValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <label htmlFor={name} className="flex flex-col gap-1">
          <span className="text-xs font-semibold">{label}</span>
          <input
            id={name}
            value={value}
            onChange={onChange}
            autoComplete={autocomplete ? "on" : "new-password"}
            type={type}
            className={classNames(
              "border bg-gray-50 text-xs px-2 py-2 rounded transition-colors",
              error && "border-red-500"
            )}
            placeholder={label ? `Enter your ${label.toLowerCase()}` : ""}
          />
          {error && (
            <span className="text-red-500 text-xs">{error?.message}</span>
          )}
        </label>
      )}
    />
  );
};

export default FormInputText;

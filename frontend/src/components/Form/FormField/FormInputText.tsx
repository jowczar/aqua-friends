import React from "react";
import { Controller } from "react-hook-form";
import { FormInputProps } from "@/common/types";
import classNames from "classnames";

const FormInputText = ({ name, control, rules, label }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <label htmlFor={label} className="flex flex-col gap-1">
          <span className="text-xs font-semibold">{label}</span>
          <input
            id={label}
            value={value}
            onChange={onChange}
            type="text"
            className={classNames(
              "border bg-gray-50 text-xs px-2 py-2 rounded transition-colors",
              error && "border-red-500"
            )}
            placeholder={`Enter your ${label.toLowerCase()}`}
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

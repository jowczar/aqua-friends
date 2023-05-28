import { UseControllerProps } from "react-hook-form";

export type HexColor = `#${string}`;

export type FormInputProps = {
  label?: string;
  className?: string;
} & UseControllerProps;

import { Control } from "react-hook-form";

export type HexColor = `#${string}`;

export type FormInputProps = {
  name: string;
  control: Control;
  label: string;
  rules: Record<string, unknown>;
};

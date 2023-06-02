import {
  Control,
  DeepMap,
  FieldError,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

export type HexColor = `#${string}`;

export interface FormInputProps<TFormValues extends FieldValues> {
  label?: string;
  className?: string;
  control: Control<TFormValues, object>;
  rules?: RegisterOptions;
  name: FieldPath<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
}

export type UserData = {
  email: string;
  displayName: string;
  photoUrl: string;
};

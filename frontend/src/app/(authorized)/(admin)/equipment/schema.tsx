import { object, string as yupString, ref, number } from "yup";

export const formSchema = object().shape({
  name: yupString()
    .min(3, "Name is too short")
    .max(30, "Name is too long")
    .required("Name is required"),
  width: number().min(0, "Width must be > 0").required("Width is required"),
  height: number().min(0, "Height must be > 0").required("Height is required"),
  length: number().min(0, "Length must be > 0").required("Length is required"),
  water: yupString()
      .oneOf(["freshwater", "saltwater", "both"])
      .required("Choose one of the following: freshwater, saltwater, both"),
});

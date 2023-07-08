import { object, string as yupString, ref } from "yup";

export const formSchema = object().shape({
  name: yupString()
    .min(3, "Name is too short")
    .max(30, "Name is too long")
    .required("Name is required"),
  species: yupString()
    .min(3, "Species is too short")
    .max(30, "Species is too long")
    .required("Species is required"),
    "requirements.water": yupString()
      .oneOf(["freshwater", "saltwater"])
      .required("Choose one of the following: freshwater, saltwater"),
});

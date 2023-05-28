import { FirebaseError } from "firebase/app";
import { object, string as yupString, ref } from "yup";

export const formSchema = object().shape({
  displayName: yupString()
    .min(3, "Name is too short")
    .max(30, "Name is too long")
    .required("Name is required"),
  email: yupString().email("Invalid email").required("Email is required"),
  password: yupString().min(
    6,
    "Password length should be at least 6 characters"
  ),
  passwordConfirm: yupString()
    .oneOf([ref("password")], "Passwords must match")
    .when("password", {
      is: (password: string) => password?.length > 0,
      then: (schema) => schema.required("Password confirmation is required"),
      otherwise: (schema) => schema,
    }),
});

export const handleFirebaseError = (error: FirebaseError) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "Email already in use";
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/weak-password":
      return "Password is too weak";
    case "auth/wrong-password":
      return "Wrong password";
    case "auth/missing-password":
      return "Please enter your current password";
    case "auth/too-many-requests":
      return "Too many requests. Try again later";
    default:
      return "Something went wrong";
  }
};

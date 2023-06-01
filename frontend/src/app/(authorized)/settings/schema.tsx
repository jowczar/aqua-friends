import { FIREBASE_AUTH_ERROR_CODES } from "@/common/firebase";
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
    case FIREBASE_AUTH_ERROR_CODES.EMAIL_EXISTS:
      return "Email already in use";
    case FIREBASE_AUTH_ERROR_CODES.INVALID_EMAIL:
      return "Invalid email";
    case FIREBASE_AUTH_ERROR_CODES.WEAK_PASSWORD:
      return "Password is too weak";
    case FIREBASE_AUTH_ERROR_CODES.INVALID_PASSWORD:
      return "Wrong password";
    case FIREBASE_AUTH_ERROR_CODES.MISSING_PASSWORD:
      return "Please enter your current password";
    case FIREBASE_AUTH_ERROR_CODES.TOO_MANY_ATTEMPTS_TRY_LATER:
      return "Too many requests. Try again later";
    default:
      console.error(error);
      return "Something went wrong";
  }
};

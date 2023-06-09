import { FirebaseError } from "firebase-admin";

const isFirebaseError = (error: unknown): error is FirebaseError => {
  return (error as FirebaseError).code !== undefined;
};

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export default isFirebaseError;

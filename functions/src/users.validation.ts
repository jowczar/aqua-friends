import { object, string } from "yup";

export const addAdminSchema = object({
  body: object({
    displayName: string().min(3).max(30).required(),
    password: string().min(6).required(),
    email: string().email().required(),
  }),
});

export const deleteAdminSchema = object({
  params: object({
    uid: string().required(),
  }),
});

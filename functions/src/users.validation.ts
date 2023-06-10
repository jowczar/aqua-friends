import { object, string } from "yup";

export const addAdminSchema = object({
  body: object({
    url: string().url().required(),
    title: string().min(8).max(32).required(),
    content: string().min(8).max(255).required(),
    contact: string().email().required(),
  }),
});

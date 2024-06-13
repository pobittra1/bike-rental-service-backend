import { z } from "zod";

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "name must be string",
    }),
    email: z.string().email(),
    password: z.string({
      invalid_type_error: "password must be string",
    }),
    phone: z.string({ invalid_type_error: "phone number must be string" }),
    address: z.string({ invalid_type_error: "address must be string" }),
    role: z.enum(["admin", "user"]),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "email is required." }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const authValidations = {
  registerUserValidationSchema,
  loginUserValidationSchema,
};

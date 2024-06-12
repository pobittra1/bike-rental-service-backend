import { z } from "zod";

const registerUserValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "name must be string",
  }),
  email: z.string().email(),
  password: z.string({
    invalid_type_error: "password n=must be string",
  }),
  phone: z.string({ invalid_type_error: "phone number must be string" }),
  address: z.string({ invalid_type_error: "address must be string" }),
  role: z.enum(["admin", "user"]),
});

export const authValidations = {
  registerUserValidationSchema,
};

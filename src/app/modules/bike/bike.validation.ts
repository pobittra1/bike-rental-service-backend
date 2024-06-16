import { z } from "zod";

const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "name must be string",
    }),
    description: z.string(),
    pricePerHour: z.number({
      invalid_type_error: "pricePerHour must be number",
    }),
    isAvailable: z.boolean().optional(),
    cc: z.number(),
    year: z.number(),
    model: z.string({
      invalid_type_error: "model must be string",
    }),
    brand: z.string({
      invalid_type_error: "brand must be string",
    }),
  }),
});

export const bikeValidation = {
  createBikeValidationSchema,
};

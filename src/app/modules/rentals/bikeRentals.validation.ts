import { z } from "zod";

const createBikeRentalsValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    bikeId: z.string(),
    startTime: z.string(),
    returnTime: z.boolean().nullable().optional(),
    totalCost: z.number().default(0),
    isReturned: z.boolean().default(false),
  }),
});

export const bikeRentalsValidation = {
  createBikeRentalsValidationSchema,
};

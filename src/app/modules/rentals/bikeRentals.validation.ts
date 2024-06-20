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
const returnBikeRentalsValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    bikeId: z.string(),
    startTime: z.string(),
    returnTime: z.boolean().optional(),
    totalCost: z.number(),
    isReturned: z.boolean(),
  }),
});

export const bikeRentalsValidation = {
  createBikeRentalsValidationSchema,
  returnBikeRentalsValidationSchema,
};

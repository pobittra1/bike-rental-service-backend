import { Schema, model } from "mongoose";
import { TBikeRentals } from "./bikeRentals.interface";
import { string } from "zod";

const CreateBikeRentalsSchema = new Schema<TBikeRentals>(
  {
    userId: {
      type: String,
    },
    bikeId: {
      type: Schema.Types.ObjectId,
    },
    startTime: {
      type: String,
    },
    returnTime: {
      type: Boolean,
      default: null,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

//create model for bike rentals
export const BikeRentals = model<TBikeRentals>(
  "BikeRentals",
  CreateBikeRentalsSchema
);

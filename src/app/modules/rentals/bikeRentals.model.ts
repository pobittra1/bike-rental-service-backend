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
      type: String,
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

const returnBikeRentalsSchema = new Schema<TBikeRentals>(
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
      type: String,
    },
    totalCost: {
      type: Number,
    },
    isReturned: {
      type: Boolean,
    },
  },
  { versionKey: false }
);

//create model for bike rentals
export const ReturnBikeRentals = model<TBikeRentals>(
  "ReturnBikeRentals",
  returnBikeRentalsSchema
);

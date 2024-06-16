import { Types } from "mongoose";

export type TBikeRentals = {
  userId?: string;
  bikeId: Types.ObjectId;
  startTime: string;
  returnTime: boolean;
  totalCost: number;
  isReturned: boolean;
};

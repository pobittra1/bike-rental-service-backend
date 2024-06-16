import httpStatus from "http-status";
import AppError from "../../config/error/AppError";
import { TBikeRentals } from "./bikeRentals.interface";
import { BikeRentals } from "./bikeRentals.model";
import { Bike } from "../bike/bike.model";

const createBikeRentalsIntoDB = async (payload: TBikeRentals) => {
  const { bikeId, startTime } = payload;

  //check if the bike id is exists!
  const isBikeIdExists = await Bike.findById(bikeId);
  if (!isBikeIdExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Bike id not found !");
  }
  const isThisBikeAvailable = isBikeIdExists.isAvailable;
  if (!isThisBikeAvailable) {
    throw new AppError(httpStatus.NOT_FOUND, "this bike isn't available !");
  }
  //set false for is available bike
  // isBikeIdExists.isAvailable = false;
  await Bike.findByIdAndUpdate(
    {
      _id: bikeId,
    },
    {
      isAvailable: false,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!startTime) {
    throw new AppError(httpStatus.NOT_FOUND, "please provide startTime !");
  }
  const result = await BikeRentals.create(payload);
  return result;
};

const returnBikeToOwnerIntoDB = async (rentalsBikeId: string) => {
  const isExistsBikeRental = BikeRentals.findById(rentalsBikeId);
  console.log(isExistsBikeRental);
  if (!isExistsBikeRental) {
    throw new AppError(httpStatus.NOT_FOUND, "rentals bike is not found !");
  }

  // const startTime = new Date(isExistsBikeRental.isReturn);
};

export const bikeRentalsService = {
  createBikeRentalsIntoDB,
  returnBikeToOwnerIntoDB,
};

import httpStatus from "http-status";
import AppError from "../../config/error/AppError";
import { TBikeRentals } from "./bikeRentals.interface";
import { BikeRentals, ReturnBikeRentals } from "./bikeRentals.model";
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
  const isExistsBikeRental = (await BikeRentals.findById(
    rentalsBikeId
  )) as TBikeRentals;
  if (!isExistsBikeRental) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "return rentals bike is not found !"
    );
  }
  const { bikeId } = isExistsBikeRental;
  //if isReturn true that mean bike availablity true. so throw an error
  if (isExistsBikeRental.isReturned) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "this bike already return or available to rental"
    );
  }
  //start time convert into date time
  const startTime = new Date(isExistsBikeRental.startTime);
  const returnTime = new Date();
  const rentalDurationInHour = Math.ceil(
    (returnTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
  );
  //find price per hour for this bike
  const pricePerHourBike = await Bike.findById(bikeId);
  const pricePerHour = pricePerHourBike?.pricePerHour;
  //if pricePerHour not available
  if (!pricePerHour) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "this bike pricePerHour not found"
    );
  }

  // Store ISO string in RentalsBike model to date
  isExistsBikeRental.returnTime = returnTime.toISOString();
  isExistsBikeRental.totalCost = rentalDurationInHour * pricePerHour;
  //set isReturned true when bike is return
  //in response
  isExistsBikeRental.isReturned = true;
  //in bike rentals model
  await BikeRentals.findOneAndUpdate(
    {
      bikeId: bikeId,
    },
    {
      isReturned: true,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  //set false for is available bike
  // isBikeIdExists.isAvailable = false;
  await Bike.findByIdAndUpdate(
    {
      _id: bikeId,
    },
    {
      isAvailable: true,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  //const result = await ReturnBikeRentals.create(isExistsBikeRental);
  // isExistsBikeRental.aggregate([
  //   { $match: { name: /data/ } },
  //   { $out: "newColl" },
  // ]);

  return isExistsBikeRental;
};

const getAllRentalsFromDB = async () => {
  const result = await ReturnBikeRentals.find();
  return result;
};

export const bikeRentalsService = {
  createBikeRentalsIntoDB,
  returnBikeToOwnerIntoDB,
  getAllRentalsFromDB,
};

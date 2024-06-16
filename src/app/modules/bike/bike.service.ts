import httpStatus from "http-status";
import AppError from "../../config/error/AppError";
import { TBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};

const getAllBikesFromDB = async () => {
  const result = await Bike.find({}, { __v: 0 });
  return result;
};

const updateBikeInDB = async (id: string, payload: Partial<TBike>) => {
  //const { pricePerHour } = payload;
  const user = await Bike.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      pricePerHour: payload.pricePerHour,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  //if user not exists
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  return user;
};

const deleteBikeInDB = async (id: string) => {
  //const { pricePerHour } = payload;
  const user = await Bike.findByIdAndUpdate(
    {
      _id: id,
    },
    { isAvailable: false },
    {
      new: true,
      runValidators: true,
    }
  );
  //if user not exists
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  return user;
};

export const bikeService = {
  createBikeIntoDB,
  getAllBikesFromDB,
  updateBikeInDB,
  deleteBikeInDB,
};

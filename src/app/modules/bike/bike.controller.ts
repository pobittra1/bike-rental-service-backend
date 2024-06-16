import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bikeService } from "./bike.srvice";

//destructuring service
const { createBikeIntoDB, getAllBikesFromDB } = bikeService;

const createBike = catchAsync(async (req, res) => {
  const bikeData = req.body;

  const result = await createBikeIntoDB(bikeData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike added successfully",
    data: result,
  });
});

const getAllBikes = catchAsync(async (req, res) => {
  const result = await getAllBikesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bikes retrieved successfully",
    data: result,
  });
});

export const bikeController = {
  createBike,
  getAllBikes,
};

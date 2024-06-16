import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bikeService } from "./bike.service";

//destructuring service
const { createBikeIntoDB, getAllBikesFromDB, updateBikeInDB, deleteBikeInDB } =
  bikeService;

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

const updateBike = catchAsync(async (req, res) => {
  const { id: bikeId } = req.params;
  const updateData = req.body;
  const result = await updateBikeInDB(bikeId, updateData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike updated successfully",
    data: result,
  });
});
const deleteBike = catchAsync(async (req, res) => {
  const { id: bikeId } = req.params;
  const result = await deleteBikeInDB(bikeId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike deleted successfully",
    data: result,
  });
});

export const bikeController = {
  createBike,
  getAllBikes,
  updateBike,
  deleteBike,
};

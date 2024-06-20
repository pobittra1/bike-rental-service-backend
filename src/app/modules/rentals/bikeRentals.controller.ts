import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bikeRentalsService } from "./bikeRentals.service";
import { ReturnBikeRentals } from "./bikeRentals.model";
import { TBikeRentals } from "./bikeRentals.interface";

//destructuring bike rentals service
const {
  createBikeRentalsIntoDB,
  returnBikeToOwnerIntoDB,
  getAllRentalsFromDB,
} = bikeRentalsService;

const createBikeRentals = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const bikeRentalsData = req.body;
  const result = await createBikeRentalsIntoDB(bikeRentalsData);
  //ser userId in result.userId from token
  result.userId = userId;
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental created successfully",
    data: result,
  });
});
const returnBikeToOwner = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const rentalsBikeId = req.params.id;
  const result = await returnBikeToOwnerIntoDB(rentalsBikeId);
  //set userId in result.userId from token
  result.userId = userId;
  //await ReturnBikeRentals.create(result);
  const payload: TBikeRentals = {
    userId,
    bikeId: result.bikeId,
    startTime: result.startTime,
    returnTime: result.returnTime,
    totalCost: result.totalCost,
    isReturned: result.isReturned,
  };
  await ReturnBikeRentals.create(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike returned successfully",
    data: result,
  });
});

const getAllRentals = catchAsync(async (req, res) => {
  const result = await getAllRentalsFromDB();
  //error handling part-01
  //if data not available, show error
  if (result.length === 0) {
    sendResponse(res, {
      success: false,
      message: "No Data Found",
      data: [],
    });
  } else {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rentals retrieved successfully",
      data: result,
    });
  }
});

export const bikeRentalsController = {
  createBikeRentals,
  returnBikeToOwner,
  getAllRentals,
};

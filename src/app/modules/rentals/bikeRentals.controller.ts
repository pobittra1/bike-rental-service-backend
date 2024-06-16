import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bikeRentalsService } from "./bikeRentals.service";

//destructuring bike rentals service
const { createBikeRentalsIntoDB, returnBikeToOwnerIntoDB } = bikeRentalsService;

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
  // const { userId } = req.user;
  const bikeRentalsData = req.body;
  const rentalsBikeId = req.params.id;
  const result = await returnBikeToOwnerIntoDB(rentalsBikeId);
  //ser userId in result.userId from token
  // result.userId = userId;
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental created successfully",
    data: null,
  });
});

export const bikeRentalsController = {
  createBikeRentals,
  returnBikeToOwner,
};

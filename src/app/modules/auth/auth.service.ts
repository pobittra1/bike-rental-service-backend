import httpStatus from "http-status";
import AppError from "../../config/error/AppError";
import { TLoginUser, TUser } from "./auth.interface";
import { User } from "./auth.model";
import jwt from "jsonwebtoken";
import config from "../../config";

const userRegisterIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (email: string, password: string) => {
  //checking if the user is exists by email
  const user = await User.findOne(
    { email },
    { createdAt: 0, updatedAt: 0, __v: 0 }
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  //checking if the password is correct or incorrect of user
  if (!(password === user?.password)) {
    throw new AppError(httpStatus.CONFLICT, "This password is not correct !");
  }

  //create token and send to the client
  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "30d",
  });

  return {
    token,
    user,
  };
};

export const authService = {
  userRegisterIntoDB,
  loginUser,
};

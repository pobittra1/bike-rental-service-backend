import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../config/error/AppError";
import { TLoginUser, TUser } from "./auth.interface";
import { User } from "./auth.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import * as argon2 from "argon2";

const userRegisterIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // const { email, password } = payload;
  //checking if the user is exists by email
  const user = await User.findOne(
    { email: payload?.email },
    { createdAt: 0, updatedAt: 0, __v: 0 }
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  //checking if the password is correct or incorrect of user with normal password
  // if (!(password === user?.password)) {
  //   throw new AppError(httpStatus.CONFLICT, "This password is not correct !");
  // }

  //checking if the password is correct or incorrect with bcrypt password
  // const isPasswordMatched = await bcrypt.compare(
  //   payload?.password,
  //   user?.password
  // );
  const isPasswordMatched = await argon2.verify(
    user?.password,
    payload?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
  }

  //create token and send to the client
  const jwtPayload = {
    userId: user._id,
    role: user.role,
    password: user.password,
  };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "30d",
  });
  return {
    token,
    user,
  };
};

const getProfileFromDB = async (tokenData: JwtPayload) => {
  const user = await User.findOne({ _id: tokenData.userId }, { password: 0 });
  //error handling part-01
  //if data not available, show error
  //if(user.length === 0)
  //if user not exists
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  return user;
};

const updateProfileInDB = async (
  tokenData: JwtPayload,
  payload: Partial<TUser>
) => {
  const { name, phone } = payload;
  const user = await User.findOne(
    { _id: tokenData.userId },
    { password: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  ).findOneAndUpdate(
    {
      _id: tokenData.userId,
    },
    {
      name: name,
      phone: phone,
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

export const authService = {
  userRegisterIntoDB,
  loginUser,
  getProfileFromDB,
  updateProfileInDB,
};

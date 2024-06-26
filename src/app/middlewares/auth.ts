import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../config/error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/auth/auth.interface";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
const auth = (...roleValue: TUserRole[]) => {
  //using catchAsync middleware
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //get token with bearer from client
    const tokenWithBearer = req.headers.authorization;
    // checking if the token is missing
    if (!tokenWithBearer) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }
    //split token from bearer
    const token = tokenWithBearer.split(" ")[1];
    //check if the token is valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized!"
          );
        }
        const role = (decoded as JwtPayload).role;
        if (roleValue && !roleValue.includes(role)) {
          return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "You have no access to this route",
          });
        }
        //assign user as property of req
        req.user = decoded as JwtPayload;

        next();
      }
    );
  });
};

export default auth;

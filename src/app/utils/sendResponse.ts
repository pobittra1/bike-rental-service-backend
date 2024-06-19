import { Response } from "express";

interface IResponse<T> {
  statusCode?: number;
  success: boolean;
  message: string;
  data: T;
  token?: string;
}

const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  res.status(data.statusCode as number).json({
    success: data.success,
    statusCode: data.statusCode,
    token: data.token,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;

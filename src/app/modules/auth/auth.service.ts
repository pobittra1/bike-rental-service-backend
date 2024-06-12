import { TUser } from "./auth.interface";
import { User } from "./auth.model";

const userRegisterIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

export const authService = {
  userRegisterIntoDB,
};

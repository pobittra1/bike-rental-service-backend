import { Model } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "admin" | "user";
};

export type TLoginUser = {
  email: string;
  password: string;
};

// export interface UserModel extends Model<TUser> {
//   //instance methods for checking if the user exist
//   isUserExistsByCustomId(id: string): Promise<TUser>;
// }

import { Schema, model } from "mongoose";
import { TLoginUser, TUser } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//------------middlewares start---------//
//pre save middleware/hook: will work on create(), save()
userSchema.pre("save", async function (next) {
  //hashing password and save into db
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

//set empty str of password after creating data
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});
//------------middlewares end---------//

// userSchema.static(
//   "isUserExistsByEmail",
//   async function isUserExistsByEmail(email: string) {
//     return await User.findOne({ email }).select("+password");
//   }
// );

export const User = model<TUser>("User", userSchema);

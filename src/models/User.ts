import mongoose, { Model } from "mongoose";
import { IUser } from "@/types";

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    image: { type: String },
    password: { type: String },
    address: { type: String },
    phone: { type: String },
    role: {
      type: String,
      enum: ["customer", "restaurant_owner", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", UserSchema);
//creating User collection
export default User;

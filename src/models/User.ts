import { IUser } from "@/types";
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, unique: true, trim: true },
    password: { type: String },
    avatar: { type: String, default: "" },
    address: { type: String, trim: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    birthday: { type: Date},
    role: {
      type: String,
      enum: ["customer", "restaurant_owner", "admin"],
      default: "customer",
    },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || model<IUser>("User", userSchema);

export default User;

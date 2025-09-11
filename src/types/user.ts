import { Document, Types } from "mongoose";

export type UserRole = "customer" | "restaurant_owner" | "admin";
export type Gender = "Male" | "Female" | "Other" | undefined;

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  avatar?: string;
  address?: string;
  gender?: Gender;
  birthday?: Date;
  role: UserRole;
  restaurantId?: Types.ObjectId | string;
}

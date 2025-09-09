import { Document } from "mongoose";

export type UserRole = "customer" | "restaurant_owner" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  address: string;
  phone: string;
  role: UserRole;
}

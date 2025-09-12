import { Types } from "mongoose";

export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  image: string;
  price: number;
  category?: string;
  isAvailable: boolean;
  restaurantId: Types.ObjectId | string; // reference to Restaurant
}

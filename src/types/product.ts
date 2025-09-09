import { Schema } from "mongoose";

export interface IProduct {
  _id?: string;
  name: string;
  description?: string;
  image: string;
  price: number;
  type?: string;
  restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true }; // reference to Restaurant
}

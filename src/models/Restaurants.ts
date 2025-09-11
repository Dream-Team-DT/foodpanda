import { IRestaurant } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const RestaurantSchema = new mongoose.Schema<IRestaurant>(
  {
    title: { type: String, required: true },
    slogan: { type: String },
    banner: { type: String },
    logo: { type: String },
    address: { type: String },
    postcode: { type: String },
    country: { type: String },
    phone: { type: String },
    isOpen: { type: Boolean, default: true },
    offer: {
      type: String,
      enum: ["Free_delivery", "Accepts_voucher", "deals"],
    },
    isSuper: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    cuisines: [{ type: String }],
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Restaurant: Model<IRestaurant> =
  mongoose.models.Restaurant || mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;

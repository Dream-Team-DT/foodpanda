import { Schema } from "mongoose";

export type OfferType = "Free_delivery" | "Accepts_voucher" | "Deals";
export type CuisineType = "Asian" | "Bakery" | "Bangladeshi" | "Beverage" | "Fish" | "Other";

export interface IRestaurant {
  _id?: string;
  title: string;
  slogan?: string;
  banner?: string;
  priceLabel?: string;
  address: string;
  isOpen: boolean;
  offer?: OfferType;
  isSuper?: boolean;
  cuisines?: CuisineType[];
  ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true }; // reference to User
}

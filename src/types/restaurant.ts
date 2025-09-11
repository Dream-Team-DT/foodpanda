import { Types } from "mongoose";

export type OfferType = "Free_delivery" | "Accepts_voucher" | "Deals";
export type CuisineType = "Asian" | "Bakery" | "Bangladeshi" | "Beverage" | "Fish" | "Other";

export interface IRestaurant {
  _id?: string;
  title: string;
  slogan?: string;
  banner?: string;
  logo?: string;
  phone:string;
  priceLabel?: string;
  address: string;
  postcode?: string;
  country?: string;
  isOpen: boolean;
  offer?: OfferType;
  isSuper?: boolean;
  isVerified: boolean;
  cuisines?: CuisineType[];
  ownerId: Types.ObjectId | string; // reference to User
}

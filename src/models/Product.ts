import { Schema, model, models } from "mongoose";
import { IProduct } from "@/types/product";

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    isAvailable: { type: Boolean, default: true },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = models.Product || model<IProduct>("Product", ProductSchema);
export default Product;

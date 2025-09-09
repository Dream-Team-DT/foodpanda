import mongoose from "mongoose";

let isConnected = false;

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("Please add your Mongo URI to");
}

export default async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(uri, { dbName: "FoodPanda" });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error", error);
    throw error;
  }
}

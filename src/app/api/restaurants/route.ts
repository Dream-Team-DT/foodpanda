import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Restaurant from "@/models/Restaurants";

// GET all restaurants
export async function GET() {
  await connectDB();
  const restaurants = await Restaurant.find();
  // const restaurants = await Restaurant.find().populate("ownerId");
  return NextResponse.json(restaurants);
}

// POST new restaurant
export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const restaurant = await Restaurant.create(data);
  return NextResponse.json(restaurant, { status: 201 });
}

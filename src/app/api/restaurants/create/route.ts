import connectDB from "@/lib/dbConnect";
import Restaurant from "@/models/Restaurants";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { userId, title, slogan, banner, address, phone, country } = body;

    const restaurant = await Restaurant.create({
      ownerId: userId,
      title,
      slogan,
      banner,
      address,
      phone,
      country,
    });

    // Update user role + restaurantId
    await User.findByIdAndUpdate(
      userId,
      {
        role: "restaurant_owner",
        restaurantId: restaurant._id,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, restaurant });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}

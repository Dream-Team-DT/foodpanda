import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Restaurant from "@/models/Restaurants";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;
  const restaurant = await Restaurant.findById(id).lean();

  if (!restaurant) {
    return NextResponse.json(
      { error: "Restaurant not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(restaurant);
}

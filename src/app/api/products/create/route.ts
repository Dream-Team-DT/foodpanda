import connectDB from "@/lib/dbConnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { restaurantId, name, description, image, price, category } = body;

    const product = await Product.create({
      restaurantId,
      name,
      description,
      image,
      price,
      category,
    });

    return NextResponse.json({ success: true, product });
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

import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;
  const products = await Product.find({ restaurantId: id }).lean();

  if (!products || products.length === 0) {
    return NextResponse.json(
      { error: "No products found for this restaurant" },
      { status: 404 }
    );
  }

  return NextResponse.json(products);
}

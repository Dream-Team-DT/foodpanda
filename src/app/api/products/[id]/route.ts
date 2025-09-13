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

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const body = await req.json();
    const { id } = await context.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      // isAvailable: body.isAvailable,
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating product:" + (error as Error).message },
      { status: 500 }
    );
  }
}

// Delete Product
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;

  const product = await Product.findById(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  await Product.findByIdAndDelete(id);

  return NextResponse.json(
    { message: "Product deleted successfully" },
    { status: 200 }
  );
}

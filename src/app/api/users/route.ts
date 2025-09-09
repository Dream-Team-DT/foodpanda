import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import User from "@/models/User";

// GET all user
export async function GET() {
  await connectDB();
  const users = await User.find({}).lean();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const user = await User.create(data);
  return NextResponse.json(user);
}

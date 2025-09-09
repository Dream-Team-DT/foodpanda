import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/dbConnect";
import User from "@/models/User";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  await connectDB();
  const updatedUser = await User.findOneAndUpdate(
    { email: session.user.email },
    { $set: body },
    { new: true }
  );

  return NextResponse.json(updatedUser);
}

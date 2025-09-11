import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import User from "@/models/User";
import connectDB from "@/lib/dbConnect";
import { IUser } from "@/types";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get user
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    const user = await User.findById(id).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" + error },
      { status: 500 }
    );
  }
}

// Update User info
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;
  try {
    const contentType = req.headers.get("content-type") || "";

    let updateData: Partial<IUser> = {};

    if (contentType.includes("application/json")) {
      updateData = await req.json();
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("avatar") as File;
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadToCloudinary = () =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "avatars" },
              (err, result) => {
                if (err || !result) reject(err);
                else resolve(result);
              }
            );
            stream.end(buffer);
          });

        const result = (await uploadToCloudinary()) as { secure_url: string };
        updateData.avatar = result.secure_url;
      }
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Update failed:" + (error as Error).message },
      { status: 500 }
    );
  }
}

// Delete user
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 }
  );
}

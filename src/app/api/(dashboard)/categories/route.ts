import connect from "@/lib/db";
import User from "@/lib/models/user";
import Category from "@/lib/models/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found in the database" },
        { status: 404 }
      );
    }

    const categories = await Category.find({ user: userId });
    return NextResponse.json(categories, { status: 200 });
  } catch (error: any) {
    console.error("Error in fetching categories:", error);
    return NextResponse.json(
      { message: "Error in fetching categories", error: error.message },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    const { title } = await request.json();

    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found in the database" },
        { status: 404 }
      );
    }

    const newCategory = new Category({
      title,
      user: new Types.ObjectId(userId),
    });

    await newCategory.save();

    return NextResponse.json(
      { message: "Category created successfully", category: newCategory },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in creating category:", error);
    return NextResponse.json(
      { message: "Error in creating category", error: error.message },
      { status: 500 }
    );
  }
};

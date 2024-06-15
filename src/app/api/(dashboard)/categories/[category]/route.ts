import connect from "@/lib/db";
import User from "@/lib/models/user";
import Category from "@/lib/models/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const PATCH = async (request: Request, context: { params: any }) => {
  const categoryId = context.params.category;

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return NextResponse.json(
        { message: "Invalid or missing categoryId" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title } = body;

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const category = await Category.findOne({ _id: categoryId, user: userId });
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    category.title = title;
    await category.save();

    return NextResponse.json(
      { message: "Category updated successfully", category },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in updating category:", error);
    return NextResponse.json(
      { message: "Error in updating category", error: error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: Request, context: { params: any }) => {
  const categoryId = context.params.category;

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return NextResponse.json(
        { message: "Invalid or missing categoryId" },
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const category = await Category.findOne({ _id: categoryId, user: userId });
    if (!category) {
      return NextResponse.json(
        { message: "Category not found or does not belong to the user" },
        { status: 404 }
      );
    }

    await category.remove();

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in deleting category:", error);
    return NextResponse.json(
      { message: "Error in deleting category", error: error.message },
      { status: 500 }
    );
  }
};

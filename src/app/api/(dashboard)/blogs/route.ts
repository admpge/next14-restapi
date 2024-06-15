import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Blog from "@/lib/models/blog";
import User from "@/lib/models/user";
import Category from "@/lib/models/category";
import { Types } from "mongoose";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");
    const searchKeywords = searchParams.get("keywords") as string;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

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

    const category = await Category.findById(categoryId);
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const filter: any = {
      user: userId,
      category: categoryId,
    };

    if (searchKeywords) {
      filter.$or = [
        { title: { $regex: searchKeywords, $options: "i" } },
        { description: { $regex: searchKeywords, $options: "i" } },
      ];
    }

    if (startDate && endDate) {
      filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      filter.createdAt = { $gte: new Date(startDate) };
    } else if (endDate) {
      filter.createdAt = { $lte: new Date(endDate) };
    }

    const skip = (page - 1) * limit;

    const blogs = await Blog.find(filter)
      .sort({ createdAt: "asc" })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: any) {
    console.error("Error in fetching blogs:", error);
    return NextResponse.json(
      { message: "Error in fetching blogs", error: error.message },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

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
    const { title, description } = body;

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const newBlog = new Blog({
      title,
      description,
      user: userId,
      category: categoryId,
    });

    await newBlog.save();

    return NextResponse.json(
      { message: "Blog created successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in creating blog:", error);
    return NextResponse.json(
      { message: "Error in creating blog", error: error.message },
      { status: 500 }
    );
  }
};

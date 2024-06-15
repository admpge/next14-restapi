import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Blog from "@/lib/models/blog";
import User from "@/lib/models/user";
import Category from "@/lib/models/category";
import { Types } from "mongoose";

export const GET = async (request: Request, context: { params: any }) => {
  const blogId = context.params.blog;

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

    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return NextResponse.json(
        { message: "Invalid or missing blogId" },
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

    const blog = await Blog.findOne({
      _id: blogId,
      user: userId,
      category: categoryId,
    });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error: any) {
    console.error("Error in fetching blog:", error);
    return NextResponse.json(
      { message: "Error in fetching blog", error: error.message },
      { status: 500 }
    );
  }
};

export const PATCH = async (request: Request, context: { params: any }) => {
  const blogId = context.params.blog;

  try {
    const body = await request.json();
    const { title, description } = body;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return NextResponse.json(
        { message: "Invalid or missing blogId" },
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const blog = await Blog.findOne({ _id: blogId, user: userId });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    blog.title = title;
    blog.description = description;
    await blog.save();

    return NextResponse.json(
      { message: "Blog updated", blog },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { message: "Error updating blog", error: error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: Request, context: { params: any }) => {
  const blogId = context.params.blog;

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return NextResponse.json(
        { message: "Invalid or missing blogId" },
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const blog = await Blog.findOne({ _id: blogId, user: userId });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    await blog.remove();

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in deleting blog:", error);
    return NextResponse.json(
      { message: "Error in deleting blog", error: error.message },
      { status: 500 }
    );
  }
};

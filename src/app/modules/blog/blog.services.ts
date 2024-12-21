// @typescript-eslint/no-explicit-any
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { Request } from "express";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";

const createBlog = async (req: Request, blog: IBlog) => {
  const { user } = req;
  // Check if the user exists
  const userExists = await User.isUserExistsByCustomEmail(user.email);
  if (!userExists) {
    throw new Error("User not found!");
  }
  const id = userExists._id as Types.ObjectId;

  // Assign the author's ID to the blog
  blog.author = id;
  const result = await Blog.create(blog);
  const populatedBlog = await Blog.findById(result._id).populate("author"); // Adjust fields as needed

  return {
    _id: populatedBlog?._id,
    title: populatedBlog?.title,
    content: populatedBlog?.content,
    author: populatedBlog?.author,
  };
};

const updateBlog = async (req: Request, id: string, blog: Partial<IBlog>) => {
  const { email } = req.user;
  const blogExists = await Blog.findById(id).populate("author");
  if (!blogExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found!");
  }
  const authorEmail = (blogExists?.author as any)?.email;
  if (authorEmail !== email) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to update this blog!",
    );
  }
  if (!Object.keys(blog).length) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Please provide updated data to update!",
    );
  }
  const result = await Blog.findByIdAndUpdate(id, blog, { new: true }).populate(
    "author",
  );
  return {
    _id: result?._id,
    title: result?.title,
    content: result?.content,
    author: result?.author,
  };
};

const deleteBlog = async (req: Request, id: string) => {
  const { email } = req.user;
  const blogExists = await Blog.findById(id).populate("author");
  if (!blogExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found!");
  }
  const authorEmail = (blogExists?.author as any)?.email;
  if (authorEmail !== email) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to delete this blog!",
    );
  }
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(Blog.find().populate("author"), query)
    .search(["title", "content"])
    .filter()
    .sort();

  const blogs = await blogsQuery.modelQuery;
  return blogs;
};

export const BlogService = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};

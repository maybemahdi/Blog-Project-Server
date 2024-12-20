import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { Request } from "express";
import httpStatus from "http-status";

const createBlog = async (req: Request, blog: IBlog) => {
  const { user } = req;
  // Check if the user exists
  const userExists = await User.isUserExistsByCustomEmail(user.email);
  if (!userExists) {
    throw new Error("User not found!");
  }
  const _id = userExists._id as Types.ObjectId;

  // Assign the author's ID to the blog
  blog.author = _id;
  const result = await Blog.create(blog);
  const populatedBlog = await Blog.findById(result._id).populate("author"); // Adjust fields as needed

  return {
    _id: populatedBlog?._id,
    title: populatedBlog?.title,
    content: populatedBlog?.content,
    author: populatedBlog?.author,
  };
};
const updateBlog = async (id: string, blog: Partial<IBlog>) => {
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

export const BlogService = {
  createBlog,
  updateBlog,
};

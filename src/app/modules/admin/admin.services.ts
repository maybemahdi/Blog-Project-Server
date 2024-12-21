import AppError from "../../errors/AppError";
import { Blog } from "../blog/blog.model";
import { User } from "../user/user.model";
import httpStatus from "http-status";

const blockUser = async (userID: string) => {
  const user = await User.findById(userID);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const result = await User.findByIdAndUpdate(userID, { isBlocked: true });
  return result;
};

const deleteBlogByAdmin = async (blogID: string) => {
  const blog = await Blog.findById(blogID);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }
  const result = await Blog.findByIdAndDelete(blogID);
  return result;
};

export const AdminServices = {
  blockUser,
  deleteBlogByAdmin,
};

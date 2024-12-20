import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogService } from "./blog.services";
import httpStatus from "http-status";

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogService.createBlog(req, req?.body);
  sendResponse(res, {
    success: true,
    message: "Blog created successfully",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.updateBlog(id, req?.body);
  sendResponse(res, {
    success: true,
    message: "Blog updated successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
};

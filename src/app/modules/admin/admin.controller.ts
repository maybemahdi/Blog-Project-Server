import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.services";
import httpStatus from "http-status";

const blockUser = catchAsync(async (req, res) => {
  await AdminServices.blockUser(req.params.userId);
  sendResponse(res, {
    success: true,
    message: "User blocked successfully",
    statusCode: httpStatus.OK,
  });
});

const deleteBlogByAdmin = catchAsync(async (req, res) => {
  await AdminServices.deleteBlogByAdmin(req.params.id);
  sendResponse(res, {
    success: true,
    message: "Blog deleted successfully",
    statusCode: httpStatus.OK,
  });
});

export const AdminController = {
  blockUser,
  deleteBlogByAdmin,
};

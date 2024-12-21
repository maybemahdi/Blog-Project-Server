import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { AdminController } from "./admin.controller";

const AdminRoutes = Router();

AdminRoutes.patch(
  "/users/:userId/block",
  auth(USER_ROLE.admin),
  AdminController.blockUser,
);
AdminRoutes.delete(
  "/blogs/:id",
  auth(USER_ROLE.admin),
  AdminController.deleteBlogByAdmin,
);

export default AdminRoutes;

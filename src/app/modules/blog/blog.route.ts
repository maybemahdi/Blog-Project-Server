import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BlogController } from "./blog.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { blogValidationSchema } from "./blog.validation";

const BlogRoutes = Router();

BlogRoutes.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(blogValidationSchema.createBlogValidationSchema),
  BlogController.createBlog,
);
BlogRoutes.patch(
  "/:id",
  auth(USER_ROLE.user),
  validateRequest(blogValidationSchema.updateBlogValidationSchema),
  BlogController.updateBlog,
);
BlogRoutes.delete("/:id", auth(USER_ROLE.user), BlogController.deleteBlog);

export default BlogRoutes;

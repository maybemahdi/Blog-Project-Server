import { Router } from "express";
import AuthRoutes from "../modules/auth/auth.route";
import BlogRoutes from "../modules/blog/blog.route";
import AdminRoutes from "../modules/admin/admin.route";

const router = Router();
const routes = [
  {
    path: "/auth",
    destination: AuthRoutes,
  },
  {
    path: "/blogs",
    destination: BlogRoutes,
  },
  {
    path: "/admin",
    destination: AdminRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.destination));
export default router;

import express from "express";
import { AuthRoute } from "./auth.route";
import notFoundAPI from "../middlewares/notFound";
import { CategoryRoute } from "./category.route";

const router = express.Router();
// Application Module Route ---------
const moduleRoute = [
  {
    path: "/auth",
    route: AuthRoute,
  },

  {
    path: "/category",
    route: CategoryRoute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

router.use(notFoundAPI);
export const ApplicationRootRoute = router;

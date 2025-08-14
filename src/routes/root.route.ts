import express from "express";
import { AuthRoute } from "./auth.route";
import notFoundAPI from "../middlewares/notFound";
import { CourseRoute } from "./course.route";

const router = express.Router();
// Application Module Route ---------
const moduleRoute = [
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/course",
    route: CourseRoute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

router.use(notFoundAPI);
export const ApplicationRootRoute = router;

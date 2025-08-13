import express from "express";

const router = express.Router();
// Application Module Route ---------
const moduleRoute = [
  {
    path: "/organization",
    route: "xy",
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

// router.use(notFoundAPI);
export const ApplicationRootRoute = router;

import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { USER_ROLE } from "../enum/user";
import Authentication from "../middlewares/auth";

const router = express.Router();

router.post("/login", AuthController.loginUser);
router.post("/register", AuthController.registerUser);
router.get(
  "/profile",
  Authentication(USER_ROLE.USER),
  AuthController.getUserProfile
);

export const AuthRoute = router;

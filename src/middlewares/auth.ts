//Auth Guard
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const Authentication =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.cookies?.token as string;

      if (!token) {
        return next(
          new ApiError(
            StatusCodes.UNAUTHORIZED,
            "Authorization token is missing. Access denied."
          )
        );
      }
      // verify token
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.secret_token as Secret
      );

      if (!verifiedUser) {
        return next(
          new ApiError(
            StatusCodes.UNAUTHORIZED,
            "Invalid Token. Please log in again"
          )
        );
      }
      // verified user
      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        return next(
          new ApiError(
            StatusCodes.FORBIDDEN,
            "Access denied: Invalid credentials or unauthorized access."
          )
        );
      }
      next();
    } catch (error) {
      return next(
        new ApiError(
          StatusCodes.UNAUTHORIZED,
          "Unauthorized access. Please check your authentication credentials."
        )
      );
    }
  };

import jwt from "jsonwebtoken";
import { CustomError } from "../util/custom-errors.util.js";

export const authenticate = (req, res, next) => {
  try {
    // Get token from headers
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      throw new CustomError("توکن احراز هویت موجود نیست", 401);
    }

    // Extract and verify the token
    const token = authHeader.replace("Bearer ", "");

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    const invalidTokenError = new CustomError("توکن نامعتبر است", 401);
    if (err.name instanceof jwt.TokenExpiredError) {
      next(new CustomError("توکن منقضی شده است", 401));
    } else {
      next(invalidTokenError);
    }
  }
};

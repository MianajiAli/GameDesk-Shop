import { Router } from "express";

import {
  loginUser,
  signupUser,
  allUsers,
  removeUser,
} from "../controllers/user.controller.js";
import { hasAccess } from "../middlewares/access.middlewares.js";
import { authenticate } from "./../middlewares/authenticate.middlewares.js";

const router = new Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/all", authenticate, hasAccess(["viewUsers"]), allUsers);

router.delete(
  "/:username/remove",
  authenticate,
  hasAccess(["removeUser"]),
  removeUser
);

export default router;

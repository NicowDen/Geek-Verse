import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { jwtMiddleware } from "../middlewares/jwt.middleware.js";
import User from "../models/user.model.js";

const initUsersRoutes = (app, sm) => {
  const router = Router();
  router.get("/read", sm, UserController.read);
  router.post("/sign-up", sm, UserController.signUp);
  router.post("/sign-in", sm, UserController.signIn);
  router.post("/updateTheme", jwtMiddleware, sm, UserController.updateTheme);
  router.get("/check-token", jwtMiddleware, sm, UserController.getUserInfos);
  router.post("/new-admin", jwtMiddleware, sm, UserController.updateAdmin);

  app.use("/users", router);
};

export default initUsersRoutes;

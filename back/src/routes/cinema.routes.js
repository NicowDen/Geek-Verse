import { Router } from "express";
import { jwtMiddleware } from "../middlewares/jwt.middleware.js";
import { CinemaController } from "../controllers/cinema.controller.js";

const initCinemaRoutes = (app, sm) => {
  const router = Router();
  router.post("/add-new", sm, CinemaController.sendNewCinema);
  router.get("/read-all", CinemaController.readAll);
  router.get("/read-one/:filmId", sm, CinemaController.readOne);
  router.delete("/delete-one", jwtMiddleware, sm, CinemaController.deleteOne);
  app.use("/cinema", router);
};

export default initCinemaRoutes;

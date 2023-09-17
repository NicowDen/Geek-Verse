import initUsersRoutes from "./users.routes.js";
import initCinemaRoutes from "./cinema.routes.js";
import { sanitizeMiddleware } from "../middlewares/sanitize.middleware.js";

const initRoutes = (app) => {
  initUsersRoutes(app, sanitizeMiddleware);
  initCinemaRoutes(app, sanitizeMiddleware);
};

export default initRoutes;

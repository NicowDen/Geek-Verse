import express from "express";
import initRoutes from "./routes/router.js";
import { log } from "./utils/logger.utils.js";
import initDb from "./config/database.config.js";
import initMiddlewares from "./middlewares/init.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("ok");
});

await initDb();
initMiddlewares(app);
initRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running`);
  log(`Port ${PORT}`);
});

/* TODO: 
  - validations
  - population 

  - fs
  - simple react
*/

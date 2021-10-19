import express from "express";
import { home, search }from "../controllers/videoController" 
import { join, postJoin, login, postLogin } from "../controllers/userController"
import { logoutOnlyMiddleware  } from "../middlewares";

const rootRouter = express.Router();


rootRouter.get("/", home); 
rootRouter.route("/join").all(logoutOnlyMiddleware).get(join).post(postJoin);
rootRouter.route("/login").all(logoutOnlyMiddleware).get(login).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter; 
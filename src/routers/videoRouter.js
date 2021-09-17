import express from "express";
import { watch, edit } from "../controllers/videoController"

const videoRouter = express.Router();

videoRouter.get("/watch", watch);
videoRouter.get("/eidt", edit);

export default videoRouter;
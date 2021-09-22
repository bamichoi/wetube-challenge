import express from "express";
import { watch, getEdit, postEdit } from "../controllers/videoController"

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.get("/upload")

export default videoRouter; 
import express from "express";
import { watch, getEdit, postEdit, getUpload, postUpload, deleteVideo } from "../controllers/videoController"
import { uploadThumbnail, uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(uploadThumbnail.single("thumbnail"), postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);

videoRouter.route("/upload").get(getUpload)
.post(uploadVideo.single("thumbnail"), uploadVideo.single("video"), postUpload);


export default videoRouter; 


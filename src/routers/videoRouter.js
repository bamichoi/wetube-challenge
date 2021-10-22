import express from "express";
import { list, watch, getEdit, postEdit, getUpload, postUpload, deleteVideo } from "../controllers/videoController"
import { uploadThumbnail, uploadVideo, upload } from "../middlewares";
import { loginOnlyMiddleware } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/", list);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit")
    .all(loginOnlyMiddleware)
    .get(getEdit)
    .post(upload.fields([ { name: "thumbnail" }, { name: "video" }]), postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete")
    .all(loginOnlyMiddleware)
    .get(deleteVideo);
videoRouter.route("/upload")
    .all(loginOnlyMiddleware)
    .get(getUpload)
    .post(upload.fields([ { name: "thumbnail" }, { name: "video" }]), postUpload);


export default videoRouter; 


import express from "express";
import { getEdit, postEdit, logout, profile} from "../controllers/userController";
import { loginOnlyMiddleware, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", loginOnlyMiddleware, logout);
userRouter.get("/:id", profile);
userRouter.route("/:id/edit")
    .all(loginOnlyMiddleware)
    .get(getEdit)
    .post(uploadAvatar.single("avatar"), postEdit); 


export default userRouter;
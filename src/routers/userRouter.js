import express from "express";
import { edit, remove, logout, profile} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logou", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/:id", profile);


export default userRouter;
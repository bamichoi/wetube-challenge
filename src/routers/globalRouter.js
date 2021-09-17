import express from "express";
import { trending }from "../controllers/videoController" // export 는 변수,함수 이름을 그대로 써야한다.
import { join } from "../controllers/userController"

const globalRouter = express.Router();

globalRouter.get("/", trending); // app.get() 하던것처럼 router에 url과 함수 연결.
globalRouter.get("/join", join);

export default globalRouter; // // export default - export default 는 모듈내에서 한가지만 export 할 수 있다. import시 이름변경가능.
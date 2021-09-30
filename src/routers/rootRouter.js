import express from "express";
import { home, search }from "../controllers/videoController" // export 는 변수,함수 이름을 그대로 써야한다.
import { join, postJoin, login, postLogin } from "../controllers/userController"

const rootRouter = express.Router();

rootRouter.get("/", home); // app.get() 하던것처럼 router에 url과 함수 연결.
rootRouter.route("/join").get(join).post(postJoin);
rootRouter.route("/login").get(login).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter; // // export default - export default 는 모듈내에서 한가지만 export 할 수 있다. import시 이름변경가능.
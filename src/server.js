import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger); //app.use() 는 global middleware를 만들어준다. 순서는 use가 먼저오고 그 다음에 get이 와야한다.
app.use(express.urlencoded({extended : true }));
app.use(session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
}));
app.use(localMiddleware);
app.use("/uploads", express.static("uploads"))
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


export default app


// Open Server Application

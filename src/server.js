import express, { Router } from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// Create Server Application
const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger); //app.use() 는 global middleware를 만들어준다. 순서는 use가 먼저오고 그 다음에 get이 와야한다.
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// Configure Server Application


// Open Server Application
const handleListening = () => 
    console.log(`Server Listening on port http://localhost:${PORT}...`)

app.listen(PORT, handleListening);
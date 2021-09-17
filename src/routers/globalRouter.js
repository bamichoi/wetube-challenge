import express from "express";

const globalRouter = express.Router();

const handleHome = (req, res) => res.send("Home");

globalRouter.get("/", handleHome); // app.get() 하던것처럼 router에 url과 함수 연결.


export default globalRouter;
import express from "express";
import morgan from "morgan";

// Create Server Application
const PORT = 4000;

const app = express();
const logger = morgan("dev");
// Middleware



// Configure Server Application

const handleHome = (req, res) => {
    return res.send("<h1>I still love you</h1>");
}

const handleLogin = (req, res) =>{
    return res.send("Login here");
}

app.use(logger); //app.use() 는 global middleware를 만들어준다. 순서는 use가 먼저오고 그 다음에 get이 와야한다.
app.get("/", handleHome);
app.get("/login", handleLogin);


// Open Server Application
const handleListening = () => 
    console.log(`Server Listening on port http://localhost:${PORT}...`)

app.listen(PORT, handleListening);
import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

const db = mongoose.connection;

const handelOpen = () => console.log("Connected to DB ✅");

db.on("error", (error) => console.log("DB error ❌", error));
db.once("open", handelOpen);





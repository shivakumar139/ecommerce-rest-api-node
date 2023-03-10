import express from "express";
import { APP_PORT, DB_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";
import mongoose from "mongoose";
const app = express();
import path from "path";

const appPort = process.env.APP_PORT || APP_PORT;


// database connection
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", ()=> console.log("error"));
db.once("open", ()=> console.log("connected"));



global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.get("/",(req, res) =>{
    res.json({message: "Hello!👋"});
})
app.use("/api", routes);
app.use("/uploads", express.static("uploads"))






// Error Handler
app.use(errorHandler);
app.listen(appPort, ()=>console.log(`Listening to port ${APP_PORT}`))
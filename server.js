import express from "express";
import { APP_PORT, DB_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";
import mongoose from "mongoose";
const app = express();



// database connection
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", ()=> console.log("error"));
db.once("open", ()=> console.log("connected"));




app.use(express.json());
app.use("/api", routes);






// Error Handler
app.use(errorHandler);
app.listen(APP_PORT, ()=>console.log(`Listening to port ${APP_PORT}`))
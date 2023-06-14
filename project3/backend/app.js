import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import router from "./src/routes.js";



const app = express();


app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));


app.use(router);

export default app;
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors';
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import dbConnection from "./dbConfig/index.js";
import morgan from "morgan";
import routes from "./routes/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

dbConnection();

app.get('/', (req, res) => {
  res.send('API RUNNING 100 %');
})

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(routes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server running of port " + PORT);
});
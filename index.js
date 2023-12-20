import express from "express";
import dotenv from "dotenv";
// import connectDatabase from "./helpers/database/connectDatabase";
import cors from "cors";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

dotenv.config({});

// connectDatabase();

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.use(cookieParser());

const PORT = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is up");
});

app.listen(PORT, () => {
  console.log(`App started on ${PORT}: ${process.env.NODE_ENV}`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import categoriesRouter from "./src/routers/categoriesRouter.js";
import connectMongoDB from "./src/config/mongoConfig.js";

// Load environment variables from .env file
dotenv.config();
import authRouter from "./src/routers/authRouter.js";
import { connect } from "mongoose";
import { errorHandler } from "./src/middlewares/errorHandler.js";
const port = process.env.PORT || 3000;

const app = express();
//REQUEST BODY PARSER
app.use(cors()); //cors platform

app.use(express.json()); //to ready json file

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

//server status
app.get("/", (req, res, next) => {
  res.json({
    message: "serve is running port 9005 and healthy",
  });
});

// app.get("/api/v1/auth/register", (req, res, next) => {
//   res.json({
//     message: "api register",
//   });
// });
//auth route
app.use("/api/v1/auth", authRouter);
//categories route
app.use("/api/v1/categories", categoriesRouter);
//error handler middleware
app.use(errorHandler);

// Start the server and listen on port 9004
connectMongoDB()
  .then(() => {
    //connection to database
    console.log("Connected to DATABASE SUCESSFULLY");
    app.listen(port, (error) => {
      error
        ? console.log(error)
        : console.log(
            `Server is healthy and running at http://localhost:${port}`
          );
    });
  })
  .catch((error) => {
    //db error
    console.log("error");
    console.log("error connection to database");
  });

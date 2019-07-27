import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import express from "express";
import * as logger from "morgan";
import * as path from "path";
import mongoose from "mongoose";

import { MONGO_URI } from "./constant";
import ippsProvidersRouter from "../api/ippsProviders/route";

const app = express();

const promise = mongoose.connect(process.env.MONGO_URI || MONGO_URI, {
  db: { safe: true }
});

promise
  .then(() => {
    console.log("[MongoDB] successfully connected");
  })
  .catch(error => {
    console.log("[MongoDB] connection unsuccessfull", error);
  });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route mapping
app.use("/providers", ippsProvidersRouter);

export default app;

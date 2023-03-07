const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookeieParser = require("cookie-parser");
const dbconnection = require("./database/db");
const dotenv = require("dotenv");

dotenv.config({ debug: true, path: __dirname + "/.env" });

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookeieParser());

//routes
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/postRouter"));
app.use("/api", require("./routes/commentRouter"));

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await dbconnection(process.env.MONGO_URL);
    app.listen(port, console.log("Connected"));
  } catch (error) {
    console.log(error);
  }
};

console.log(process.env.MONGO_URL + "MONGODBISLEDI");

start();

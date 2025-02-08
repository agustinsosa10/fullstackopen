const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const notesRouter = require("./controllers/blogs");
const { MONGODB_URI } = require("./utils/config");
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("connected"))
  .catch((e) => console.log("error al conectarse", e));

app.use("/api/blogs", notesRouter);
module.exports = app;

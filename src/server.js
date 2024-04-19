require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const app = express();

// routes
const userRoutes = require("./routes/users");

// config
app.use(cors({ origin: "*", credentials: true }));
app.use(logger("dev"));
app.use(bodyParser.json());

// routes
app.use("/api/users", userRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log(
    `Your app ${process.env.APP_NAME} is listening to ${process.env.APP_URL}:${process.env.APP_PORT}`
  );
});

import express from "express";
import cors from "cors";
import db from "./config/db";
import path from "path";
import userRoutes from "./routes/User";
import gameRoutes from "./routes/Game";
import MainRoutes from "./middleware/MainRoutes";
require("dotenv").config();

const app = express();
app.use(express.static(`${__dirname}/dist`));
db.createConnection();
db.dbData.connection.connect((err) => {
  if (err) throw err;
  db.createTables();
});

if (process.env.NODE_ENV === "prod") {
  // allow specific request on prod
  const allowedOrigins: string[] = [
    "http://localhost:5173",
    "http://192.168.143.16:5000",
  ];
  const options: cors.CorsOptions = {
    origin: allowedOrigins,
  };
  app.use(cors(options));
} else {
  // allow all request on dev
  app.use(cors());
}
app.use(express.json());

app.get("/", (req, res) => {
  console.log("get files");
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.post("/api/status", (req, res) => {
  res.send(`${process.env.APP_NAME} is alive!`);
});
app.use("/api", MainRoutes.apiRoute);

app.use("/api/user", userRoutes);
app.use("/api/game", gameRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log(
    `${process.env.APP_NAME} is running on ${process.env.APP_URL}:${process.env.APP_PORT}`
  );
});

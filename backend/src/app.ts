import express from "express";
import feriaRoutes from "./api/feria/feriaRoutes";
import usuarioRoutes from "./api/usuario/usuarioRoutes";
import authRoutes from "./api/auth/authRoutes";
import "reflect-metadata";
import cors from "cors";
var cookieParser = require('cookie-parser');

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://plumaged-cullen-unrash.ngrok-free.dev",
      "https://inscripcion-ferias.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.options("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
  res.send(204);
});

app.use("/feria", feriaRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/auth", authRoutes);

export default app;

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
      "http://localhost:3000"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/feria", feriaRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/auth", authRoutes);

export default app;

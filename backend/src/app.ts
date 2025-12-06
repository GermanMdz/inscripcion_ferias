import express from "express";
import feriaRoutes from "./api/feria/feriaRoutes";
import usuarioRoutes from "./api/usuario/usuarioRoutes";
import authRoutes from "./api/auth/authRoutes";
import "reflect-metadata";
import cors from "cors";
var cookieParser = require('cookie-parser');

const app = express();


// import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "https://plumaged-cullen-unrash.ngrok-free.dev",
  "https://inscripcion-ferias.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // requests desde Postman o server-side
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());
app.use("/feria", feriaRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/auth", authRoutes);

export default app;

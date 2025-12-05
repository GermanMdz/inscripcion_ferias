import express from "express";
import feriaRoutes from "./api/feria/feriaRoutes";
import usuarioRoutes from "./api/usuario/usuarioRoutes";
import authRoutes from "./api/auth/authRoutes";
import "reflect-metadata";
import cors from "cors";
var cookieParser = require('cookie-parser')


const app = express();


app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://inscripcion-ferias-5vsz7xcf4-germanmdzs-projects.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/feria", feriaRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/auth", authRoutes);
// curl en powershell
// curl -Uri "http://localhost:3000/ferias/crear" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{ "nombre": "Test2" }'

// curl en cmd
// curl -X POST "http://localhost:3000/ferias/crear" -H "Content-Type: application/json" -d "{\"nombre\":\"Test\"}"

export default app;

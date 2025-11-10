import express from "express";
import feriaRoutes from "./api/feria/feriaRoutes";
import usuarioRoutes from "./api/usuario/usuarioRoutes";
import "reflect-metadata";

const app = express();

app.use(express.json());
app.use("/ferias", feriaRoutes);
app.use("/usuario", usuarioRoutes);
// curl en powershell
// curl -Uri "http://localhost:3000/ferias/crear" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{ "nombre": "Test2" }'

// curl en cmd
// curl -X POST "http://localhost:3000/ferias/crear" -H "Content-Type: application/json" -d "{\"nombre\":\"Test\"}"

export default app;

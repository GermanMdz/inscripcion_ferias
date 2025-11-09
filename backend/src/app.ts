import express from "express";
import feriaRoutes from "./api/feria/feriaRoutes";
import "reflect-metadata";

const app = express();

app.use(express.json());
app.use("/ferias", feriaRoutes);

export default app;

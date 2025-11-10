import "reflect-metadata";
import { DataSource } from "typeorm";
import { FeriaEntity } from "./infra/entities/feriaEntity";
import { UsuarioEntity } from "./infra/entities/usuarioEntity";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "admin",
  database: process.env.DB_NAME || "inscripcion_ferias",
  synchronize: true, // usar true solo en desarrollo
  logging: false,
  entities: [FeriaEntity, UsuarioEntity],
  migrations: [__dirname + "/migrations/*.{ts,js}"],
});
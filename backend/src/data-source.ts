import "reflect-metadata";
import { DataSource } from "typeorm";
import { FeriaEntity } from "./infra/entities/feriaEntity";
import { UsuarioEntity } from "./infra/entities/usuarioEntity";
import { InscripcionEntity } from "./infra/entities/inscripcion";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL || "url_not_set",
  // host: process.env.DB_HOST || "postgres.railway.internal",
  // port: Number(process.env.DB_PORT) || 5432,
  // username: process.env.DB_USER || "postgres",
  // password: process.env.DB_PASS || "admin",
  // database: process.env.DB_NAME || "railway",
  synchronize: false, // usar true solo en desarrollo
  logging: false,
  entities: [FeriaEntity, UsuarioEntity, InscripcionEntity],
  migrations: [__dirname + "/migrations/*.{ts,js}"],
});
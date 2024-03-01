import { createPool } from "mysql2/promise";
import dotenv from "dotenv"
const NODE_ENV = process.env.NODE_ENV | 'development'

dotenv.config({
  path: `.env.${NODE_ENV}`
});

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export { pool };

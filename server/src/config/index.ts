import dotenv from "dotenv";
import path from "path";
import process from "process";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
};

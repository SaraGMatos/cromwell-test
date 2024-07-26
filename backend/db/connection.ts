import { Pool } from "pg";
import dotenv from "@dotenvx/dotenvx";

dotenv.config();

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
}

export const db = new Pool();

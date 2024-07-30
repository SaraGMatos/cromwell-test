import { Pool, PoolConfig } from "pg";
import dotenv from "@dotenvx/dotenvx";

dotenv.config();

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
}

if (!process.env.DATABASE_URL) {
  throw new Error("No DATABASE_URL configured");
}

const config: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: 2,
};

export const db = new Pool(config);

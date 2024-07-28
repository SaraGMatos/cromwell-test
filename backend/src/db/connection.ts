import { Pool, PoolConfig } from "pg";
import dotenv from "@dotenvx/dotenvx";

dotenv.config();

const ENV = process.env.NODE_ENV || "development";

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
}

const config: PoolConfig = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

export const db = new Pool(config);

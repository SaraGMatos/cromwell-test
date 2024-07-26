import { app } from "./app";
import dotenv from "@dotenvx/dotenvx";

dotenv.config();

const PORT = process.env.PORT;
const db = process.env.PGDATABASE;

app
  .listen(PORT, (): void => {
    console.log(`Server running at port ${PORT}`);
    console.log(db);
  })
  .on("error", (error) => {
    console.log(error.message);
  });

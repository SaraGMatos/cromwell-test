import { app } from "./app";
import dotenv from "@dotenvx/dotenvx";

dotenv.config();
console.log(process.env);
const PORT = process.env.PORT;

app
  .listen(PORT, (): void => {
    console.log(`Server running at port ${PORT}`);
  })
  .on("error", (error) => {
    console.log(error.message);
  });

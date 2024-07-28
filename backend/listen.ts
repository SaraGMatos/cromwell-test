import { app } from "./app";
import dotenv from "@dotenvx/dotenvx";
import { ApplicationConfigurationError } from "./errors";

dotenv.config();

const secret = process.env.JWT_SIGNING_KEY;

if (!secret) {
  throw new ApplicationConfigurationError("JWT_SIGNING_KEY");
}

const PORT = process.env.PORT;

app
  .listen(PORT, (): void => {
    console.log(`Server running at port ${PORT}`);
  })
  .on("error", (error) => {
    console.log(error.message);
  });

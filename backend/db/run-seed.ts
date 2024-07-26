import { seed } from "./seed";
import { db } from "./connection";

const runSeed = () => {
  return seed().then(() => db.end());
};

runSeed();

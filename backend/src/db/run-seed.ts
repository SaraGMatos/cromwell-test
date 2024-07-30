import { seed } from "./seed";
import { db } from "./connection";

seed().then(() => {
  console.log("Seeding completed");

  db.end();
});

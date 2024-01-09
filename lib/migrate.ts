import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "./db";

async function main() {
  await migrate(db, {
    migrationsFolder: "./drizzle",
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

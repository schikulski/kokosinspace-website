import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

// Neon speaks HTTP via fetch(). Opt out of Next's fetch data cache so every
// render reads fresh rows; the rendered page itself is still ISR-cached and
// purged with revalidatePath() from the admin actions.
const sql = neon(url, { fetchOptions: { cache: "no-store" } });

export const db = drizzle(sql, { schema });
export { schema };

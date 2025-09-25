import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@prova-facil-ai/db";

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });

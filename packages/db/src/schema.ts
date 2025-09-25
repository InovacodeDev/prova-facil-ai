import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

/**
 * Represents a user in our system. The primary key `id` is a direct
 * foreign key to the user ID in the Better Auth system. This table
 */
export const users = pgTable("users", {
    // The ID is a string provided by Better Auth, acting as our primary key.
    id: varchar("id", { length: 255 }).primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

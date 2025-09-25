import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { db } from "../database/database";
import { users } from "@prova-facil-ai/db";

@Injectable()
export class UserService {
    async syncUser(userId: string) {
        // Check if user exists
        const existing = await db.select().from(users).where(eq(users.id, userId)).limit(1);
        if (existing.length === 0) {
            // Insert new user
            await db.insert(users).values({ id: userId }).onConflictDoNothing();
        }
    }
}

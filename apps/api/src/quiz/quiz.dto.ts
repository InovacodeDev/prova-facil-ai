import { z } from "zod";

export const createQuizSchema = z.object({
    sourceType: z.enum(["text", "file"]),
    content: z.string().min(1, "Content cannot be empty"),
});

export type CreateQuizDto = z.infer<typeof createQuizSchema>;

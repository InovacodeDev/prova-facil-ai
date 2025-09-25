import { Injectable } from "@nestjs/common";
import { GoogleAiService } from "../google-ai/google-ai.service";

@Injectable()
export class QuizService {
    constructor(private readonly googleAiService: GoogleAiService) {}

    async generateQuiz(sourceType: "text" | "file", content: string) {
        // For now, we only support text input
        // TODO: Add support for file processing (PDF text extraction)
        if (sourceType === "file") {
            // Placeholder for file processing
            content = `Conteúdo extraído do arquivo: ${content}`;
        }

        return await this.googleAiService.generateQuestions(content);
    }
}

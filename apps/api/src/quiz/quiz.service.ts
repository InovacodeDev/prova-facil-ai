import { Injectable } from "@nestjs/common";

@Injectable()
export class QuizService {
    async generateQuiz(sourceType: "text" | "file", content: string) {
        // TODO: Implement actual quiz generation logic
        // This will integrate with GoogleAiService later
        return {
            questions: [
                {
                    question: "Sample question?",
                    options: ["A", "B", "C", "D"],
                    correctAnswer: "A",
                },
            ],
        };
    }
}

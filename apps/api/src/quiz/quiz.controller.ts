import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { createQuizSchema, CreateQuizDto } from "./quiz.dto";
import { QuizService } from "./quiz.service";

@Controller("quizzes")
@UseGuards(AuthGuard)
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @Post()
    async createQuiz(@Body() body: CreateQuizDto) {
        // Validate the request body
        const validatedData = createQuizSchema.parse(body);

        // Generate the quiz
        const result = await this.quizService.generateQuiz(validatedData.sourceType, validatedData.content);

        return result;
    }
}

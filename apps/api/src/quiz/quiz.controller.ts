import { Body, Controller, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { createQuizSchema, CreateQuizDto } from "./quiz.dto";
import { QuizService } from "./quiz.service";
import { LoggingInterceptor } from "../logging/logging.interceptor";

@Controller("quizzes")
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
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

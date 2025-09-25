import { Module } from "@nestjs/common";
import { QuizController } from "./quiz.controller";
import { QuizService } from "./quiz.service";
import { GoogleAiModule } from "../google-ai/google-ai.module";
import { LoggingModule } from "../logging/logging.module";

@Module({
    imports: [GoogleAiModule, LoggingModule],
    controllers: [QuizController],
    providers: [QuizService],
    exports: [QuizService],
})
export class QuizModule {}

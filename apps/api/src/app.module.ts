import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
import { UserModule } from "./user/user.module";
import { QuizModule } from "./quiz/quiz.module";

@Module({
    imports: [UserModule, QuizModule],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}

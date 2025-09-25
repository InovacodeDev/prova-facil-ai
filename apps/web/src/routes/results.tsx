import { createFileRoute } from "@tanstack/react-router";
import { Results } from "../components/Results";

interface QuizData {
    questions: Array<{
        question: string;
        options: string[];
        correctAnswer: string;
    }>;
}

export const Route = createFileRoute()({
    component: Results,
    validateSearch: (search: Record<string, unknown>) => ({
        quiz: search.quiz ? JSON.parse(search.quiz as string) : null,
    }),
});

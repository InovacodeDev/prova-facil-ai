import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

interface GenerateQuizParams {
    sourceType: "text" | "file";
    content: string;
}

interface QuizResponse {
    questions: Array<{
        question: string;
        options: string[];
        correctAnswer: string;
    }>;
}

export function useGenerateQuiz() {
    const navigate = useNavigate();

    return useMutation<QuizResponse, Error, GenerateQuizParams>({
        mutationFn: async ({ sourceType, content }) => {
            const response = await fetch("/api/quizzes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // TODO: Add Authorization header with JWT from Better Auth
                },
                body: JSON.stringify({
                    sourceType,
                    content,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate quiz");
            }

            return response.json();
        },
        onSuccess: (data) => {
            // Navigate to results page with data as search params
            navigate({
                to: "/results",
                search: { quiz: JSON.stringify(data) },
            });
        },
    });
}

import { useMutation } from "@tanstack/react-query";

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
            // TODO: Navigate to results page with data
            console.log("Quiz generated:", data);
            alert("Quiz generated successfully! Check console for data.");
        },
    });
}

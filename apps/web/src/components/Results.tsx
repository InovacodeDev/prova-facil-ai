import { useSearch } from "@tanstack/react-router";
import { Button } from "./ui/Button";

interface QuizData {
    questions: Array<{
        question: string;
        options: string[];
        correctAnswer: string;
    }>;
}

export function Results() {
    const { quiz } = useSearch({ from: "/results" }) as { quiz: QuizData };

    if (!quiz) {
        return <div>No quiz data available</div>;
    }

    const handleCopyAll = async () => {
        const quizText = quiz.questions
            .map((question, index) => {
                const optionsText = question.options
                    .map((option, optionIndex) => `${String.fromCharCode(65 + optionIndex)}. ${option}`)
                    .join("\n");

                return `Questão ${index + 1}: ${question.question}\n\n${optionsText}\n\nResposta correta: ${
                    question.correctAnswer
                }\n\n---\n`;
            })
            .join("\n");

        try {
            await navigator.clipboard.writeText(quizText);
            // TODO: Show success toast
            alert("Quiz copiado para a área de transferência!");
        } catch (err) {
            console.error("Failed to copy text: ", err);
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = quizText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            alert("Quiz copiado para a área de transferência!");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Resultado do Quiz</h1>
                    <Button onClick={handleCopyAll}>Copiar Tudo</Button>
                </div>

                <div className="space-y-6">
                    {quiz.questions.map((question, index) => (
                        <QuizQuestionCard key={index} question={question} index={index + 1} />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface QuizQuestionCardProps {
    question: {
        question: string;
        options: string[];
        correctAnswer: string;
    };
    index: number;
}

function QuizQuestionCard({ question, index }: QuizQuestionCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">
                Questão {index}: {question.question}
            </h3>

            <div className="space-y-2 mb-4">
                {question.options.map((option, optionIndex) => (
                    <div
                        key={optionIndex}
                        className={`p-3 rounded border ${
                            option === question.correctAnswer
                                ? "bg-green-100 border-green-300"
                                : "bg-gray-50 border-gray-200"
                        }`}
                    >
                        <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span> {option}
                        {option === question.correctAnswer && (
                            <span className="ml-2 text-green-600 font-semibold">(Correta)</span>
                        )}
                    </div>
                ))}
            </div>

            <div className="text-sm text-gray-600">Resposta correta: {question.correctAnswer}</div>
        </div>
    );
}

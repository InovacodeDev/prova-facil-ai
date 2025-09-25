import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable()
export class GoogleAiService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor() {
        const apiKey = process.env.GOOGLE_AI_API_KEY;
        if (!apiKey) {
            throw new Error("GOOGLE_AI_API_KEY environment variable is not set");
        }

        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    async generateQuestions(text: string): Promise<any> {
        try {
            const prompt = this.buildPrompt(text);

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const generatedText = response.text();

            // Parse the generated text into structured questions
            return this.parseQuestions(generatedText);
        } catch (error) {
            console.error("Error generating questions with Google AI:", error);
            throw new ServiceUnavailableException("Failed to generate questions. Please try again later.");
        }
    }

    private buildPrompt(text: string): string {
        return `Você é um especialista em educação e criação de questões para provas. Com base no texto fornecido abaixo, gere 5 questões de múltipla escolha (A, B, C, D) sobre o conteúdo.

IMPORTANTE:
- Cada questão deve ter exatamente 4 opções (A, B, C, D)
- Apenas uma opção deve ser correta
- As questões devem testar compreensão, não apenas memorização
- Use português brasileiro
- Foque nos conceitos principais do texto
- As opções incorretas devem ser plausíveis, mas claramente erradas

TEXTO PARA ANÁLISE:
${text}

FORMATO DE SAÍDA (responda APENAS com o JSON, sem texto adicional):
{
  "questions": [
    {
      "question": "Pergunta 1?",
      "options": ["A) Opção A", "B) Opção B", "C) Opção C", "D) Opção D"],
      "correctAnswer": "A"
    }
  ]
}`;
    }

    private parseQuestions(generatedText: string): any {
        try {
            // Try to extract JSON from the response
            const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error("No JSON found in response");
            }

            const parsed = JSON.parse(jsonMatch[0]);

            // Validate the structure
            if (!parsed.questions || !Array.isArray(parsed.questions)) {
                throw new Error("Invalid questions structure");
            }

            // Validate each question
            for (const question of parsed.questions) {
                if (!question.question || !question.options || !question.correctAnswer) {
                    throw new Error("Invalid question structure");
                }
                if (question.options.length !== 4) {
                    throw new Error("Each question must have exactly 4 options");
                }
                if (!["A", "B", "C", "D"].includes(question.correctAnswer)) {
                    throw new Error("Correct answer must be A, B, C, or D");
                }
            }

            return parsed;
        } catch (error) {
            console.error("Error parsing generated questions:", error);
            // Return a fallback structure if parsing fails
            return {
                questions: [
                    {
                        question: "Erro ao processar questões geradas. Tente novamente.",
                        options: ["A) Opção A", "B) Opção B", "C) Opção C", "D) Opção D"],
                        correctAnswer: "A",
                    },
                ],
            };
        }
    }
}

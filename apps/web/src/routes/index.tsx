import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Button } from "../components/ui/Button";
import { useGenerateQuiz } from "../hooks/useGenerateQuiz";
import { createFileRoute } from "@tanstack/react-router";

export function Home() {
    const [text, setText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [activeTab, setActiveTab] = useState("text");
    const [successMessage, setSuccessMessage] = useState("");

    const hasInput = (activeTab === "text" && text.trim()) || (activeTab === "file" && file);

    const generateQuiz = useGenerateQuiz();

    const handleGenerate = () => {
        if (!hasInput) return;

        setSuccessMessage("");

        let content = "";
        let sourceType: "text" | "file" = "text";

        if (activeTab === "text") {
            content = text;
            sourceType = "text";
        } else if (file) {
            // For now, read file as text. In real implementation, might need to handle PDF differently
            const reader = new FileReader();
            reader.onload = (e) => {
                content = e.target?.result as string;
                generateQuiz.mutate({ sourceType, content });
            };
            reader.readAsText(file);
            return; // Wait for file read
        }

        generateQuiz.mutate({ sourceType, content });
    };

    // Handle success
    if (generateQuiz.isSuccess) {
        setSuccessMessage("Questões geradas com sucesso!");
        generateQuiz.reset(); // Reset to allow new attempts
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <h1 className="text-2xl font-normal text-on-surface text-center mb-8">Crie sua prova em segundos.</h1>
                <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <Tabs.List className="flex mb-4">
                        <Tabs.Trigger
                            value="text"
                            className="px-4 py-2 text-on-surface border-b-2 border-transparent data-[state=active]:border-primary"
                        >
                            Colar texto
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="file"
                            className="px-4 py-2 text-on-surface border-b-2 border-transparent data-[state=active]:border-primary"
                        >
                            Enviar arquivo
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="text" className="space-y-4">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Cole o texto do material de aula aqui..."
                            className="w-full h-40 p-4 border border-outline rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                            disabled={generateQuiz.isPending}
                        />
                    </Tabs.Content>
                    <Tabs.Content value="file" className="space-y-4">
                        <input
                            type="file"
                            accept=".txt,.pdf"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="w-full p-4 border border-outline rounded-lg"
                            disabled={generateQuiz.isPending}
                        />
                    </Tabs.Content>
                </Tabs.Root>
                {generateQuiz.isError && (
                    <div className="mt-4 p-4 bg-error-container text-on-error-container rounded-lg">
                        Erro ao gerar questões. Tente novamente.
                    </div>
                )}
                {successMessage && (
                    <div className="mt-4 p-4 bg-success-container text-on-success-container rounded-lg">
                        {successMessage}
                    </div>
                )}
                <div className="mt-8 text-center">
                    <Button disabled={!hasInput || generateQuiz.isPending} onClick={handleGenerate}>
                        {generateQuiz.isPending ? "Gerando..." : "Gerar Questões"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export const Route = createFileRoute()({
    component: Home,
});

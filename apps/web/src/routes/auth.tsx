import { createFileRoute } from "@tanstack/react-router";

function Auth() {
    return <div>Auth Page</div>;
}

export const Route = createFileRoute()({
    component: Auth,
});

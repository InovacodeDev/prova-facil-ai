import { createFileRoute } from "@tanstack/react-router";

function Home() {
    return <div>Home Page</div>;
}

export const Route = createFileRoute()({
    component: Home,
});

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import "./index.css";

const router = createRouter({ routeTree });

const queryClient = new QueryClient();

// import { BetterAuthProvider } from 'better-auth/react' // TODO

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            {/* <BetterAuthProvider baseURL={import.meta.env.VITE_BETTER_AUTH_URL}> */}
            <RouterProvider router={router} />
            {/* </BetterAuthProvider> */}
        </QueryClientProvider>
    </StrictMode>
);

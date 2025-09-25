import { createRootRoute, Outlet } from "@tanstack/react-router";

// import { BetterAuthProvider } from 'better-auth/react' // TODO: install when available

export const Route = createRootRoute({
    component: () => (
        // <BetterAuthProvider baseURL={import.meta.env.VITE_BETTER_AUTH_URL}>
        <Outlet />
        // </BetterAuthProvider>
    ),
});

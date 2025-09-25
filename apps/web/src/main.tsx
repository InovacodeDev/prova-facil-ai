import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, createRoute, createRootRoute, RouterProvider } from "@tanstack/react-router";
import "./index.css";

const rootRoute = createRootRoute();

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <div>Home</div>,
});

const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/auth",
    component: () => (
        <div>
            {/* <SignIn /> <SignUp /> TODO: use when available */}
            <div>Sign In Form</div>
            <div>Sign Up Form</div>
        </div>
    ),
});

const routeTree = rootRoute.addChildren([indexRoute, authRoute]);

const router = createRouter({ routeTree });

// import { BetterAuthProvider } from 'better-auth/react' // TODO

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {/* <BetterAuthProvider baseURL={import.meta.env.VITE_BETTER_AUTH_URL}> */}
        <RouterProvider router={router} />
        {/* </BetterAuthProvider> */}
    </StrictMode>
);

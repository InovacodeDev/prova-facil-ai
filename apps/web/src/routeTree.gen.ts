import { Route as rootRoute } from "./routes/__root";
import { Route as IndexRoute } from "./routes/index";
import { Route as AuthRoute } from "./routes/auth";

const rootRouteChildren = [IndexRoute, AuthRoute];

export const routeTree = rootRoute.addChildren(rootRouteChildren);

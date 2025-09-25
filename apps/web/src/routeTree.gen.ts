import { Route as rootRoute } from "./routes/__root";
import { Route as IndexRoute } from "./routes/index";
import { Route as AuthRoute } from "./routes/auth";
import { Route as ResultsRoute } from "./routes/results";

const rootRouteChildren = [IndexRoute, AuthRoute, ResultsRoute];

export const routeTree = rootRoute.addChildren(rootRouteChildren);

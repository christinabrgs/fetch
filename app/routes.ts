import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "auth/login.tsx"),
    layout("routes/userRoutes.tsx", [
        route("/dashboard", "routes/dashboard.tsx"),
    ]),
] satisfies RouteConfig;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource-variable/atkinson-hyperlegible-next";
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

import { Layout } from "@/components/derived/layout";
import { catalogRoute } from "@/pages/catalog";
import { clientRoute } from "@/pages/client";
import { indexRoute } from "@/pages/home";
import { invoiceRoute } from "@/pages/invoice";

export const rootRoute = createRootRoute({
  component: Layout,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  clientRoute,
  catalogRoute,
  invoiceRoute,
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import client from "./apolloClient";
import App from "./App";
import "./styles/index.css";
import { ApolloProvider } from "@apollo/client/react";
const StudentsPage = lazy(() => import("./pages/StudentsPage"));
const StudentDetailPage = lazy(() => import("./pages/StudentDetailPage"));
const StudentEditPage = lazy(() => import("./pages/StudentEditPage"));
import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    children: [
      { element: <StudentsPage />, index: true },
      { element: <StudentsPage />, path: "students" },
      { element: <StudentEditPage />, path: "students/new" },
      { element: <StudentDetailPage />, path: "students/:id" },
      { element: <StudentEditPage />, path: "students/:id/edit" },
      { element: <div>404 – Nicht gefunden</div>, path: "*" },
    ],
    element: <App />,
    path: "/",
  },
]);

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element not found");
}
createRoot(rootEl).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);

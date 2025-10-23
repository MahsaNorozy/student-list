import client from "./apolloClient";
import App from "./App";
import StudentDetailPage from "./pages/StudentDetailPage";
import StudentEditPage from "./pages/StudentEditPage";
import StudentsPage from "./pages/StudentsPage";
import "./styles/index.css";
import { ApolloProvider } from "@apollo/client/react";
import { StrictMode } from "react";
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

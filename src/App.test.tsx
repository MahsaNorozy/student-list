import App from "./App";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

test("zeigt Header und Logo", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Studentenverwaltung/i)).toBeInTheDocument();
  expect(screen.getByAltText(/Uni Logo/i)).toBeInTheDocument();
  expect(screen.getByText(/Verwalten und aktualisieren/i)).toBeInTheDocument();
});

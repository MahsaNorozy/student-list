import App from "./App";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("App Component", () => {
  test("renders the app header", () => {
    render(<App />);
    expect(screen.getByText("Studentenverwaltung")).toBeInTheDocument();
  });

  test("renders initial students", () => {
    render(<App />);
    expect(screen.getByText("Anna Schmidt")).toBeInTheDocument();
    expect(screen.getByText("Max Müller")).toBeInTheDocument();
  });

  test("can select a student and show details", () => {
    render(<App />);

    const studentButton = screen.getByText("Anna Schmidt");
    fireEvent.click(studentButton);

    // Annahme: dein StudentDetails zeigt z.B. "Email" oder "Adresse"
    expect(screen.getByText(/anna@beispiel\.de/i)).toBeInTheDocument();
    expect(screen.getByText(/Musterstraße 1/i)).toBeInTheDocument();
  });
});

/*import App from "./App";
/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";

test("zeigt den Text", () => {
  render(<App />);
  const texts = screen.getAllByText("h1");
  expect(texts.length).toBeGreaterThan(0);
});*/

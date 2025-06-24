import App from "./FruherApp";
/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";

test("zeigt den Text", () => {
  render(<App />);
  const texts = screen.getAllByText(/react/i);
  expect(texts.length).toBeGreaterThan(0);
});

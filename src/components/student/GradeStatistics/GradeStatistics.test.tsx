import GradeStatistics from "./GradeStatistics";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import type { Grade } from "../../../types";

describe("GradeStatistics", () => {
  const mockGrades: Grade[] = [
    {
      courseName: "Mathematik",
      date: "2024-01-15",
      gradeValue: "1.7",
      isPassed: true,
    },
    {
      courseName: "Programmierung",
      date: "2024-02-20",
      gradeValue: "2.3",
      isPassed: true,
    },
    {
      courseName: "Datenbanken",
      date: "2024-03-10",
      gradeValue: "1.0",
      isPassed: true,
    },
    {
      courseName: "Netzwerke",
      date: "2024-04-05",
      gradeValue: "4.0",
      isPassed: false,
    },
  ];

  it("should render heading", () => {
    render(<GradeStatistics grades={mockGrades} />);

    expect(
      screen.getByRole("heading", { name: /notenübersicht/i })
    ).toBeInTheDocument();
  });

  it("should calculate and display average grade", () => {
    render(<GradeStatistics grades={mockGrades} />);

    // Durchschnitt: (1.7 + 2.3 + 1.0 + 4.0) / 4 = 2.25
    expect(screen.getByText("2.25")).toBeInTheDocument();
  });

  it("should display passed and failed counts", () => {
    render(<GradeStatistics grades={mockGrades} />);

    expect(screen.getByText("3 / 4")).toBeInTheDocument(); // Bestanden: 3 / 4
    expect(screen.getByText("1")).toBeInTheDocument(); // Nicht bestanden: 1
  });

  it("should toggle details visibility when button is clicked", async () => {
    const user = userEvent.setup();

    render(<GradeStatistics grades={mockGrades} />);

    // Details sind zunächst ausgeblendet
    expect(screen.queryByText("Beste Note:")).not.toBeInTheDocument();
    expect(screen.queryByText("Schlechteste Note:")).not.toBeInTheDocument();

    // Button klicken, um Details anzuzeigen
    const toggleButton = screen.getByRole("button", {
      name: /details anzeigen/i,
    });
    await user.click(toggleButton);

    // Details sind jetzt sichtbar
    expect(screen.getByText("Beste Note:")).toBeInTheDocument();
    expect(screen.getByText("1.00")).toBeInTheDocument(); // Beste Note
    expect(screen.getByText("Schlechteste Note:")).toBeInTheDocument();
    expect(screen.getByText("4.00")).toBeInTheDocument(); // Schlechteste Note

    // Button erneut klicken, um Details auszublenden
    const hideButton = screen.getByRole("button", {
      name: /details ausblenden/i,
    });
    await user.click(hideButton);

    // Details sind wieder ausgeblendet
    expect(screen.queryByText("Beste Note:")).not.toBeInTheDocument();
    expect(screen.queryByText("Schlechteste Note:")).not.toBeInTheDocument();
  });

  it("should display placeholder when no valid grades", () => {
    const emptyGrades: Grade[] = [];
    render(<GradeStatistics grades={emptyGrades} />);

    expect(screen.getByText("—")).toBeInTheDocument(); // Durchschnitt placeholder
    expect(screen.getByText("0 / 0")).toBeInTheDocument(); // Bestanden: 0 / 0
    expect(screen.getByText("0")).toBeInTheDocument(); // Nicht bestanden: 0
  });

  it("should handle grades with invalid values", () => {
    const invalidGrades: Grade[] = [
      {
        courseName: "Test",
        date: "2024-01-01",
        gradeValue: "invalid",
        isPassed: false,
      },
      {
        courseName: "Test2",
        date: "2024-01-02",
        gradeValue: "",
        isPassed: false,
      },
    ];

    render(<GradeStatistics grades={invalidGrades} />);

    expect(screen.getByText("—")).toBeInTheDocument(); // Durchschnitt placeholder
  });

  it("should calculate statistics correctly with mixed grades", () => {
    const mixedGrades: Grade[] = [
      {
        courseName: "Test1",
        date: "2024-01-01",
        gradeValue: "1.0",
        isPassed: true,
      },
      {
        courseName: "Test2",
        date: "2024-01-02",
        gradeValue: "3.0",
        isPassed: true,
      },
    ];

    render(<GradeStatistics grades={mixedGrades} />);

    // Durchschnitt: (1.0 + 3.0) / 2 = 2.00
    expect(screen.getByText("2.00")).toBeInTheDocument();
    expect(screen.getByText("2 / 2")).toBeInTheDocument(); // Alle bestanden
  });

  it("should filter out negative and zero grades from calculation", () => {
    const gradesWithInvalid: Grade[] = [
      {
        courseName: "Valid",
        date: "2024-01-01",
        gradeValue: "2.0",
        isPassed: true,
      },
      {
        courseName: "Invalid",
        date: "2024-01-02",
        gradeValue: "0",
        isPassed: false,
      },
      {
        courseName: "Negative",
        date: "2024-01-03",
        gradeValue: "-1",
        isPassed: false,
      },
    ];

    render(<GradeStatistics grades={gradesWithInvalid} />);

    // Nur die gültige Note (2.0) wird berücksichtigt
    expect(screen.getByText("2.00")).toBeInTheDocument();
  });
});

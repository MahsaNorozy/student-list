import GradesEditor from "./GradesEditor";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { Grade } from "../../../types";

describe("GradesEditor", () => {
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
  ];

  const mockOnAddGrade = vi.fn();
  const mockOnChangeGrade = vi.fn();
  const mockOnRemoveGrade = vi.fn();

  it("should render heading", () => {
    render(
      <GradesEditor
        grades={mockGrades}
        onAddGrade={mockOnAddGrade}
        onChangeGrade={mockOnChangeGrade}
        onRemoveGrade={mockOnRemoveGrade}
      />
    );

    expect(
      screen.getByRole("heading", { name: /notenspiegel/i })
    ).toBeInTheDocument();
  });

  it("should render all grades", () => {
    render(
      <GradesEditor
        grades={mockGrades}
        onAddGrade={mockOnAddGrade}
        onChangeGrade={mockOnChangeGrade}
        onRemoveGrade={mockOnRemoveGrade}
      />
    );

    expect(screen.getByDisplayValue("Mathematik")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1.7")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Programmierung")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2.3")).toBeInTheDocument();
  });

  it("should call onAddGrade when add button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <GradesEditor
        grades={mockGrades}
        onAddGrade={mockOnAddGrade}
        onChangeGrade={mockOnChangeGrade}
        onRemoveGrade={mockOnRemoveGrade}
      />
    );

    const addButton = screen.getByRole("button", { name: /note hinzufügen/i });
    await user.click(addButton);

    expect(mockOnAddGrade).toHaveBeenCalledTimes(1);
  });

  it("should call onChangeGrade when course name is changed", async () => {
    const user = userEvent.setup();

    render(
      <GradesEditor
        grades={mockGrades}
        onAddGrade={mockOnAddGrade}
        onChangeGrade={mockOnChangeGrade}
        onRemoveGrade={mockOnRemoveGrade}
      />
    );

    const courseNameInput = screen.getByDisplayValue("Mathematik");
    await user.clear(courseNameInput);
    await user.type(courseNameInput, "Analysis");

    expect(mockOnChangeGrade).toHaveBeenCalledWith(0, "courseName", "Analysis");
  });

  it("should call onChangeGrade when grade value is changed", async () => {
    const user = userEvent.setup();

    render(
      <GradesEditor
        grades={mockGrades}
        onAddGrade={mockOnAddGrade}
        onChangeGrade={mockOnChangeGrade}
        onRemoveGrade={mockOnRemoveGrade}
      />
    );

    const gradeInput = screen.getByDisplayValue("1.7");
    await user.clear(gradeInput);
    await user.type(gradeInput, "1.3");

    expect(mockOnChangeGrade).toHaveBeenCalledWith(0, "gradeValue", "1.3");
  });

  it("should call onChangeGrade when date is changed", async () => {
    const user = userEvent.setup();

    render(
      <GradesEditor
        grades={mockGrades}
        onAddGrade={mockOnAddGrade}
        onChangeGrade={mockOnChangeGrade}
        onRemoveGrade={mockOnRemoveGrade}
      />
    );

    const dateInput = screen.getByDisplayValue("2024-01-15");
    await user.clear(dateInput);
    await user.type(dateInput, "2024-03-01");

    expect(mockOnChangeGrade).toHaveBeenCalledWith(0, "date", "2024-03-01");
  });

  it("should call onChangeGrade when checkbox is toggled", async () => {
    const user = userEvent.setup();

    render(
      <GradesEditor
        grades={mockGrades}
        onAddGrade={mockOnAddGrade}
        onChangeGrade={mockOnChangeGrade}
        onRemoveGrade={mockOnRemoveGrade}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);

    expect(mockOnChangeGrade).toHaveBeenCalledWith(0, "isPassed", false);
  });

  it("should call onRemoveGrade when delete button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <GradesEditor
        grades={mockGrades}
        onAddGrade={mockOnAddGrade}
        onChangeGrade={mockOnChangeGrade}
        onRemoveGrade={mockOnRemoveGrade}
      />
    );

    const deleteButtons = screen.getAllByRole("button", {
      name: /diesen kurs entfernen/i,
    });
    await user.click(deleteButtons[0]);

    expect(mockOnRemoveGrade).toHaveBeenCalledWith(0);
  });

  it("should render empty state when no grades", () => {
    render(
      <GradesEditor
        grades={[]}
        onAddGrade={mockOnAddGrade}
        onChangeGrade={mockOnChangeGrade}
        onRemoveGrade={mockOnRemoveGrade}
      />
    );

    expect(
      screen.getByRole("heading", { name: /notenspiegel/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /note hinzufügen/i })
    ).toBeInTheDocument();
    expect(screen.queryByDisplayValue("Mathematik")).not.toBeInTheDocument();
  });
});

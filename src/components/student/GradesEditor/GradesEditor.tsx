import DeleteButton from "../../common/DeleteButton/DeleteButton";
import React from "react";

import type { Grade } from "../../../types";

interface GradesEditorProps {
  grades: Grade[];
  onAddGrade: () => void;
  onChangeGrade: (
    idx: number,
    field: keyof Grade,
    value: boolean | string
  ) => void;
  onRemoveGrade: (idx: number) => void;
}

const GradesEditor: React.FC<GradesEditorProps> = ({
  grades,
  onAddGrade,
  onChangeGrade,
  onRemoveGrade,
}) => {
  return (
    <>
      <h3>Notenspiegel</h3>
      {grades.map((grade, idx) => (
        <div className="grade-block" key={idx}>
          <DeleteButton
            ariaLabel="Diesen Kurs entfernen"
            className="grade-remove-btn"
            onClick={() => onRemoveGrade(idx)}
            title="Diesen Kurs entfernen"
          />

          <input
            onChange={(e) => onChangeGrade(idx, "courseName", e.target.value)}
            placeholder="Kursname"
            required
            type="text"
            value={grade.courseName}
          />

          <input
            onChange={(e) => onChangeGrade(idx, "gradeValue", e.target.value)}
            placeholder="Note"
            required
            type="text"
            value={grade.gradeValue}
          />

          <input
            onChange={(e) => onChangeGrade(idx, "date", e.target.value)}
            required
            type="date"
            value={grade.date}
          />

          <div className="grade-passed-row">
            <input
              checked={grade.isPassed}
              id={`passed-${idx}`}
              onChange={(e) => onChangeGrade(idx, "isPassed", e.target.checked)}
              type="checkbox"
            />
            <label htmlFor={`passed-${idx}`}> Bestanden</label>
          </div>
        </div>
      ))}

      <div className="add-grade-row">
        <button onClick={onAddGrade} type="button">
          Note hinzufügen
        </button>
      </div>
    </>
  );
};

export default GradesEditor;

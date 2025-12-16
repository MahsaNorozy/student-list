import DeleteButton from "../../common/DeleteButton/DeleteButton";
import React from "react";

import type { Student } from "../../../types";

interface StudentListItemProps {
  deletingId: null | number;
  isSelected: boolean;
  onDelete: (e: React.MouseEvent, id: number) => void;
  onSelect: (id: number) => void;
  student: StudentListItemData;
}

type StudentListItemData = Pick<Student, "id" | "matriculationNumber" | "name">;

const StudentListItem: React.FC<StudentListItemProps> = ({
  deletingId,
  isSelected,
  onDelete,
  onSelect,
  student,
}) => {
  return (
    <li className={`student-list-item${isSelected ? " selected" : ""}`}>
      <button
        className="student-list-item-button"
        onClick={() => onSelect(student.id)}
        type="button"
      >
        <span className="profile-info">
          <b>{student.name}</b>{" "}
          <span className="matriculation-number">
            ({student.matriculationNumber})
          </span>
        </span>
      </button>

      <DeleteButton
        ariaLabel={`Lösche ${student.name}`}
        className="student-remove-btn"
        disabled={deletingId === student.id}
        loading={deletingId === student.id}
        onClick={(e) => onDelete(e, student.id)}
        title="Student löschen"
      />
    </li>
  );
};

export default StudentListItem;

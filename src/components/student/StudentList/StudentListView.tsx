import StudentListItem from "./StudentListItem";
import React from "react";

import type { Student } from "../../../types";

interface StudentListViewProps {
  deletingId: null | number;
  onDelete: (e: React.MouseEvent, id: number) => void;
  onSelect: (id: number) => void;
  selectedId: null | number;
  students: StudentListItemData[];
}

type StudentListItemData = Pick<Student, "id" | "matriculationNumber" | "name">;

const StudentListView: React.FC<StudentListViewProps> = ({
  deletingId,
  onDelete,
  onSelect,
  selectedId,
  students,
}) => {
  return (
    <ul className="student-list">
      {students.map((student) => (
        <StudentListItem
          deletingId={deletingId}
          isSelected={selectedId === student.id}
          key={student.id}
          onDelete={onDelete}
          onSelect={onSelect}
          student={student}
        />
      ))}
    </ul>
  );
};

export default StudentListView;

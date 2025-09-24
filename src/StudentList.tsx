import React from "react";

import type { Student } from "./types";
import "./styles/StudentList.css";

type Props = {
  onSelect: (id: number) => void;
  selectedId: null | number;
  students: Student[];
};

const StudentList: React.FC<Props> = ({ onSelect, selectedId, students }) => (
  <ul style={{ listStyle: "none", paddingLeft: 0 }}>
    {students.map((student) => (
      <li
        className={
          "student-list-item" + (selectedId === student.id ? " selected" : "")
        }
        key={student.id}
        onClick={() => onSelect(student.id)}
      >
        <ProfileInfo student={student} />
      </li>
    ))}
  </ul>
);

function ProfileInfo({ student }: Readonly<{ student: Student }>) {
  return (
    <span className="profile-info">
      <b>{student.name}</b>{" "}
      <span className="matriculation-number">
        ({student.matriculationNumber})
      </span>
    </span>
  );
}

export default StudentList;
// https://rules.sonarsource.com/typescript/tag/react/RSPEC-1077/
// https://rules.sonarsource.com/typescript/tag/react/RSPEC-6759/

import { GET_STUDENTS } from "../../../graphql/queries";
import { useQuery } from "@apollo/client/react";
import "./StudentList.css";
import React from "react";

import type { Student } from "../../../types";

// Typ für das Query-Ergebnis:
type GetStudentsData = {
  students: Array<Pick<Student, "id" | "matriculationNumber" | "name">>;
};
type Props = {
  onSelect: (id: number) => void;
  selectedId: null | number;
};

const StudentList: React.FC<Props> = ({ onSelect, selectedId }) => {
  const { data, error, loading } = useQuery<GetStudentsData>(GET_STUDENTS);

  if (loading)
    return (
      <ul>
        <li>Lade Studierende…</li>
      </ul>
    );
  if (error)
    return (
      <ul>
        <li>Fehler: {error.message}</li>
      </ul>
    );

  const students = data?.students ?? [];

  return (
    <ul className="student-list">
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
};

function ProfileInfo({
  student,
}: Readonly<{
  student: Pick<Student, "id" | "matriculationNumber" | "name">;
}>) {
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

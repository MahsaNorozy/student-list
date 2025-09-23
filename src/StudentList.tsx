import React from "react";

import type { Student } from "./types";

type Props = {
  onSelect: (id: number) => void;
  selectedId: null | number;
  students: Student[];
};

const StudentList: React.FC<Props> = ({ onSelect, selectedId, students }) => (
  <ul style={{ listStyle: "none", paddingLeft: 0 }}>
    {students.map((student) => (
      <li
        key={student.id}
        onClick={() => onSelect(student.id)}
        style={{
          alignItems: "center",
          background: selectedId === student.id ? "#e0e0e0" : "transparent",
          borderRadius: 6,
          cursor: "pointer",
          display: "flex",
          marginBottom: 4,
          padding: "8px",
        }}
      >
        {/* <ProfileImage student={student} />*/}
        <ProfileInfo student={student} />
      </li>
    ))}
  </ul>
);

/*function ProfileImage({ student }: { student: Student }) {
  return (
    <img
      alt={student.name}
      height={40}
      src={student.photoUrl}
      style={{ borderRadius: "50%", marginRight: 12 }}
      width={40}
    />
  );
}*/
function ProfileInfo({ student }: Readonly<{ student: Student }>) {
  return (
    <span style={{ flex: 1, textAlign: "left" }}>
      <b>{student.name}</b>{" "}
      <span style={{ color: "#888" }}>({student.matriculationNumber})</span>
    </span>
  );
}

export default StudentList;
// https://rules.sonarsource.com/typescript/tag/react/RSPEC-1077/
// https://rules.sonarsource.com/typescript/tag/react/RSPEC-6759/

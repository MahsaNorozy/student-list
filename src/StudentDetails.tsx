import React from "react";

import type { Student } from "./types";

type Props = {
  onEdit: (student: Student) => void;
  student: Student;
};

const StudentDetails: React.FC<Props> = ({ onEdit, student }) => (
  <div
    style={{
      background: "#fafafa",
      border: "1px solid #ddd",
      borderRadius: 8,
      margin: "24px auto",
      maxWidth: 400,
      padding: 16,
    }}
  >
    {/*<img
      alt={student.name}
      height={80}
      src={student.photoUrl}
      style={{ borderRadius: "50%" }}
      width={80}
    />*/}
    <h2>{student.name}</h2>
    <div style={{ margin: "0 auto", maxWidth: 350, textAlign: "left" }}>
      <div>
        <b>Email:</b> {student.email}
      </div>
      <div>
        <b>Adresse:</b> {student.address}
      </div>
      <div>
        <b>Studiengang:</b> {student.program}
      </div>
      <div>
        <b>Semester:</b> {student.semester}
      </div>
      <div>
        <b>Gender:</b> {student.gender}
      </div>
      <div>
        <b>Matrikelnummer:</b> {student.matriculationNumber}
      </div>
    </div>
    <h3>Notenspiegel</h3>
    <table
      style={{ borderCollapse: "collapse", margin: "0 auto", width: "100%" }}
    >
      <thead>
        <tr>
          <th style={{ borderBottom: "1px solid #ccc" }}>Kurs</th>
          <th style={{ borderBottom: "1px solid #ccc" }}>Note</th>
          <th style={{ borderBottom: "1px solid #ccc" }}>Datum</th>
          <th style={{ borderBottom: "1px solid #ccc" }}>Bestanden</th>
        </tr>
      </thead>
      <tbody>
        {student.grades.map((g, i) => (
          <tr key={i}>
            <td>{g.courseName}</td>
            <td>{g.grade}</td>
            <td>{g.date}</td>
            <td>{g.isPassed ? "✔️" : "❌"}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={() => onEdit(student)} style={{ marginTop: 16 }}>
      Bearbeiten
    </button>
  </div>
);

export default StudentDetails;

import React from "react";

import type { Student } from "./types";
import "./styles/StudentDetails.css";

type Props = {
  onEdit: (student: Student) => void;
  student: Student;
};

const StudentDetails: React.FC<Props> = ({ onEdit, student }) => (
  <div className="student-details">
    <h2>{student.name}</h2>
    <div className="student-details-info">
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
    <table className="student-details-table">
      <thead>
        <tr>
          <th>Kurs</th>
          <th>Note</th>
          <th>Datum</th>
          <th>Bestanden</th>
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
    <button
      className="student-details-edit-btn"
      onClick={() => onEdit(student)}
    >
      Bearbeiten
    </button>
  </div>
);

export default StudentDetails;

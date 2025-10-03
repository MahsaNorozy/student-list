import { GET_STUDENT } from "../graphql/queries";
import { useQuery } from "@apollo/client/react";
import React from "react";
import "../styles/StudentDetails.css";

import type { Student } from "../types";

type Props = {
  onEdit: (id: number) => void;
  studentId: number;
};

const StudentDetails: React.FC<Props> = ({ onEdit, studentId }) => {
  const { data, error, loading } = useQuery<{ student: Student }>(GET_STUDENT, {
    variables: { id: studentId },
  });

  if (loading) return <div className="student-details">Lade…</div>;
  if (error || !data?.student)
    return <div className="student-details">Nicht gefunden.</div>;

  const student = data.student;

  return (
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
              <td>{g.gradeValue}</td>
              <td>{g.date}</td>
              <td>{g.isPassed ? "✔️" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="student-details-edit-btn"
        onClick={() => onEdit(student.id)}
      >
        Bearbeiten
      </button>
    </div>
  );
};

export default StudentDetails;

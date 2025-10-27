import { DELETE_STUDENT } from "../../../graphql/mutations";
import { GET_STUDENTS } from "../../../graphql/queries";
import DeleteButton from "../../common/DeleteButton/DeleteButton";
import "./StudentList.css";
import { useMutation, useQuery } from "@apollo/client/react";
import React from "react";

import type { Student } from "../../../types";

// Typ für das Query-Ergebnis:
interface GetStudentsData {
  students: Pick<Student, "id" | "matriculationNumber" | "name">[];
}
interface Props {
  onSelect: (id: number) => void;
  selectedId: null | number;
}

const StudentList: React.FC<Props> = ({ onSelect, selectedId }) => {
  const { data, error, loading } = useQuery<GetStudentsData>(GET_STUDENTS);
  const [deletingId, setDeletingId] = React.useState<null | number>(null);

  const [deleteStudent] = useMutation(DELETE_STUDENT, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GET_STUDENTS }],
  });

  if (loading)
    return (
      <ul className="student-list">
        <li>Lade Studierende…</li>
      </ul>
    );
  if (error)
    return (
      <ul className="student-list">
        <li>Fehler: {error.message}</li>
      </ul>
    );

  const students = data?.students ?? [];

  const handleDelete = async (
    e: React.MouseEvent,
    id: number
  ): Promise<void> => {
    e.stopPropagation();
    if (!window.confirm("Student wirklich löschen?")) return;
    try {
      setDeletingId(id);
      await deleteStudent({ variables: { id } });
      // refetchQueries sorgt dafür, dass die Liste aktualisiert wird
    } catch (err: any) {
      // minimaler Fehler‑Fallback
      alert("Löschen fehlgeschlagen: " + (err?.message ?? err));
    } finally {
      setDeletingId(null);
    }
  };

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

          <DeleteButton
            ariaLabel={`Lösche ${student.name}`}
            className="student-remove-btn"
            disabled={deletingId === student.id}
            loading={deletingId === student.id}
            onClick={(e) => handleDelete(e, student.id)}
            title="Student löschen"
          />
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

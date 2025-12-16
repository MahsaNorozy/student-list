import { DELETE_STUDENT } from "../../../graphql/mutations";
import { GET_STUDENTS } from "../../../graphql/queries";
import StudentListView from "./StudentListView";
import "./StudentList.css";
import { useMutation, useQuery } from "@apollo/client/react";
import React from "react";

import type { Student } from "../../../types";

// Typ für das Query-Ergebnis
interface GetStudentsData {
  students: Pick<Student, "id" | "matriculationNumber" | "name">[];
}
interface Props {
  onSelect: (id: number) => void;
  selectedId: null | number;
}

/**
 * Container-Komponente für die Studentenliste
 * Verantwortlich für: Daten laden, Mutations, Business Logic
 */
const StudentList: React.FC<Props> = ({ onSelect, selectedId }) => {
  const { data, error, loading } = useQuery<GetStudentsData>(GET_STUDENTS);
  const [deletingId, setDeletingId] = React.useState<null | number>(null);

  const [deleteStudent] = useMutation(DELETE_STUDENT, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GET_STUDENTS }],
  });

  const handleDelete = async (
    e: React.MouseEvent,
    id: number
  ): Promise<void> => {
    e.stopPropagation();
    if (!window.confirm("Student wirklich löschen?")) return;

    try {
      setDeletingId(id);
      await deleteStudent({ variables: { id } });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      alert("Löschen fehlgeschlagen: " + errorMessage);
    } finally {
      setDeletingId(null);
    }
  };

  // Loading State
  if (loading) {
    return (
      <ul className="student-list">
        <li>Lade Studierende…</li>
      </ul>
    );
  }

  // Error State
  if (error) {
    return (
      <ul className="student-list">
        <li>Fehler: {error.message}</li>
      </ul>
    );
  }

  const students = data?.students ?? [];

  // Delegiert Rendering an View-Komponente
  return (
    <StudentListView
      deletingId={deletingId}
      onDelete={handleDelete}
      onSelect={onSelect}
      selectedId={selectedId}
      students={students}
    />
  );
};

export default StudentList;
// https://rules.sonarsource.com/typescript/tag/react/RSPEC-1077/
// https://rules.sonarsource.com/typescript/tag/react/RSPEC-6759/

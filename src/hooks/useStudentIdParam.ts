import { useParams } from "react-router-dom";

/**
 * useStudentIdParam
 *
 * Liest die Studenten-ID (`:id`) aus der aktuellen Route und gibt sie als `number` zurück,
 * sofern eine gültige dezimale ID vorhanden ist. Andernfalls wird `null` zurückgegeben.
 *
 * Typische Routen:
 *   - `/students/:id` → `StudentDetailPage`
 *   - `/students/:id/edit` → `StudentEditPage`
 *
 * Verwendung:
 *   - **StudentDetailPage**: `null` ⇒ 404 / Not Found
 *   - **StudentEditPage**: `null` ⇒ „Neuer Student“, Zahl ⇒ „Bearbeiten“
 *
 * @returns `number | null` — die extrahierte ID als Zahl oder `null`, wenn keine gültige ID vorhanden ist.
 *
 * @example
 * // StudentDetailPage: bei fehlender/ungültiger ID 404 anzeigen
 * const studentId = useStudentIdParam();
 * if (studentId === null) {
 *   return <div>404 – Not Found</div>;
 * }
 * return <StudentDetails studentId={studentId} />;
 *
 * @example
 * // StudentEditPage: null ⇒ neues Formular, Zahl ⇒ bestehender Student
 * const studentId = useStudentIdParam();
 * return <StudentForm studentId={studentId} />;
 */

export function useStudentIdParam() {
  const { id } = useParams<{ id?: string }>();
  const parsed = id ? Number.parseInt(id, 10) : null;
  return Number.isFinite(parsed) ? (parsed as number) : null;
}

import { useParams } from "react-router-dom";

/**
 * Liest die Studenten-ID (`:id`) aus der aktuellen Route und gibt sie als Zahl zurück,
 * sofern eine gültige dezimale ID vorhanden ist. Andernfalls wird `null` zurückgegeben.
 *
 * @remarks
 * Dieser Hook wird in `StudentDetailPage` und `StudentEditPage` verwendet,
 * um die ID aus der URL zu extrahieren.
 * Typische Routen:
 *   - `/students/:id`
 *   - `/students/:id/edit`
 *
 * @returns Die extrahierte ID als Zahl oder `null`, wenn keine gültige ID vorhanden ist.
 *
 * @example
 * Beispiel für die Verwendung in dem StudentDetailPage:
 * ```
 * // Zeigt 404 an, wenn die ID fehlt oder ungültig ist.
 * const studentId = useStudentIdParam();
 * if (studentId === null) {
 *   return <div>404 – Not Found</div>;
 * }
 * return <StudentDetails studentId={studentId} />;
 * ```
 *
 * @example
 * Beispiel für die Verwendung in dem StudentEditPage:
 * ```
 * // Zeigt ein neues Formular an, wenn die ID null ist,
 * // oder bearbeitet einen bestehenden Studenten, wenn die ID eine Zahl ist.
 * const studentId = useStudentIdParam();
 * return <StudentForm studentId={studentId} />;
 * ```
 */

export function useStudentIdParam() {
  const { id } = useParams<{ id?: string }>();
  const parsed = id ? Number.parseInt(id, 10) : null;
  return Number.isFinite(parsed) ? (parsed as number) : null;
}

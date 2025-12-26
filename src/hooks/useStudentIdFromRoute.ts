import { useParams } from "react-router-dom";

/**
 * Extrahiert die numerische Studenten-ID (`:id`) aus der aktuellen Route.
 * Gibt `null` zurück, wenn keine gültige ID vorhanden ist.
 *
 * @remarks
 * Dieser Hook wird in `StudentDetailPage` und `StudentEditPage` verwendet,
 * um die ID aus der URL zu extrahieren.
 * Verwendet in folgenden Routen:
 *   - `/students/:id`
 *   - `/students/:id/edit`
 *
 * @returns Die Studenten-ID als Zahl oder `null`.
 *
 * @example
 * Beispiel für die Verwendung in der StudentDetailPage:
 * ```
 * // Zeigt 404 an, wenn die ID fehlt oder ungültig ist.
 * const studentId = useStudentIdFromRoute();
 * const { goToEdit } = useStudentNavigation();
 * if (studentId === null) return <div>404 - Nicht gefunden</div>;
 * return <StudentDetails onEdit={() => goToEdit(studentId)} studentId={studentId} />;
 * ```
 *
 * @example
 * Beispiel für die Verwendung in der StudentEditPage:
 * ```
 * // Zeigt ein Formular zum Erstellen eines Studenten (ID = null)
 * // oder zum Bearbeiten eines Studenten (ID = Zahl).
 * const studentId = useStudentIdFromRoute();
 * const { goToList } = useStudentNavigation();
 * return <StudentForm onCancel={goToList} onSaved={goToList} studentId={studentId} />;
 * ```
 */

export function useStudentIdFromRoute(): null | number {
  const { id } = useParams<{ id?: string }>();
  const parsed = id ? Number.parseInt(id, 10) : NaN;
  return Number.isFinite(parsed) ? parsed : null;
}

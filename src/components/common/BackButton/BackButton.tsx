import { useStudentNavigation } from "../../../hooks/useStudentNavigation";

export default function BackButton() {
  const { goToList } = useStudentNavigation();
  return <button onClick={goToList}>⬅️ Zurück</button>;
}

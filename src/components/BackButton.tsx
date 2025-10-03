import { useStudentNavigation } from "../hooks/useStudentNavigation";

export default function BackButton({ toList = true }: { toList?: boolean }) {
  const { goBack, goToList } = useStudentNavigation();
  return <button onClick={toList ? goToList : goBack}>⬅️ Zurück</button>;
}

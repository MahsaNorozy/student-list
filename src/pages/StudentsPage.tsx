import StudentList from "../components/student/StudentList/StudentList";
import { useStudentNavigation } from "../hooks/useStudentNavigation";

export default function StudentsPage() {
  const { goToDetail, goToNew } = useStudentNavigation();
  return (
    <div>
      <button onClick={goToNew}>Student hinzufügen</button>
      <StudentList onSelect={goToDetail} selectedId={null} />
    </div>
  );
}

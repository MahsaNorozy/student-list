import BackButton from "../components/common/BackButton/BackButton";
import StudentDetails from "../components/student/StudentDetails/StudentDetails";
import { useStudentIdParam } from "../hooks/useStudentIdParam";
import { useStudentNavigation } from "../hooks/useStudentNavigation";

export default function StudentDetailPage() {
  const studentId = useStudentIdParam();
  const { goToEdit } = useStudentNavigation();
  if (studentId === null) return <div>404 - Nicht gefunden</div>;

  return (
    <div>
      <BackButton />

      <StudentDetails
        onEdit={() => goToEdit(studentId)}
        studentId={studentId}
      />
    </div>
  );
}

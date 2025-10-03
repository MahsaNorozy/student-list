import BackButton from "../components/BackButton";
import StudentDetails from "../components/StudentDetails";
import { useStudentIdParam } from "../hooks/useStudentIdParam";
import { useStudentNavigation } from "../hooks/useStudentNavigation";

export default function StudentDetailPage() {
  const studentId = useStudentIdParam();
  const { goToEdit } = useStudentNavigation();
  if (studentId === null) return <div>404 – Not Found</div>;

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

import BackButton from "../components/common/BackButton/BackButton";
import StudentDetails from "../components/student/StudentDetails/StudentDetails";
import { useStudentIdFromRoute } from "../hooks/useStudentIdFromRoute";
import { useStudentNavigation } from "../hooks/useStudentNavigation";
import "../components/student/StudentDetails/StudentDetails.css";

export default function StudentDetailPage() {
  const studentId = useStudentIdFromRoute();
  const { goToEdit } = useStudentNavigation();

  return (
    <div>
      <BackButton />

      {studentId === null ? (
        <div className="student-details-error">404 - Nicht gefunden</div>
      ) : (
        <StudentDetails
          onEdit={() => goToEdit(studentId)}
          studentId={studentId}
        />
      )}
    </div>
  );
}

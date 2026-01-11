import BackButton from "../components/common/BackButton/BackButton";
import StudentForm from "../components/student/StudentForm/StudentForm";
import { useStudentIdFromRoute } from "../hooks/useStudentIdFromRoute";
import { useStudentNavigation } from "../hooks/useStudentNavigation";

export default function StudentEditPage() {
  const studentId = useStudentIdFromRoute();
  const { goToList } = useStudentNavigation();

  return (
    <div>
      <BackButton />

      <StudentForm
        onCancel={goToList}
        onSaved={goToList}
        studentId={studentId}
      />
    </div>
  );
}

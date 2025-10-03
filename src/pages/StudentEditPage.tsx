import BackButton from "../components/BackButton";
import StudentForm from "../components/StudentForm";
import { useStudentIdParam } from "../hooks/useStudentIdParam";
import { useStudentNavigation } from "../hooks/useStudentNavigation";

export default function StudentEditPage() {
  const studentId = useStudentIdParam();
  const { goToList } = useStudentNavigation();

  return (
    <div>
      <BackButton />

      <StudentForm
        onCancel={goToList}
        onSaved={goToList}
        studentId={studentId} // null => "Neues" Formular, Zahl => "Bearbeiten" Formular
      />
    </div>
  );
}

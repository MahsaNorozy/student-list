import StudentForm from "../components/StudentForm";
import { useNavigate, useParams } from "react-router-dom";

export default function StudentEditPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/students")}>⬅️ Zurück</button>

      <StudentForm
        onCancel={() => navigate("/students")}
        onSaved={() => navigate("/students")}
        studentId={id ? Number(id) : null}
      />
    </div>
  );
}

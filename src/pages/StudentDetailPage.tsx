import StudentDetails from "../components/StudentDetails";
import { useNavigate, useParams } from "react-router-dom";

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  if (!id) return null;

  return (
    <div>
      <button onClick={() => navigate("/students")}>⬅️ Zurück</button>
      <StudentDetails
        onEdit={(sid) => navigate(`/students/${sid}/edit`)}
        studentId={Number(id)}
      />{" "}
    </div>
  );
}

import StudentList from "../components/StudentList";
import { useNavigate } from "react-router-dom";

export default function StudentsPage() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/students/new")}>
        Student hinzufügen
      </button>
      <StudentList
        onSelect={(id) => navigate(`/students/${id}`)}
        selectedId={null}
      />
    </div>
  );
}

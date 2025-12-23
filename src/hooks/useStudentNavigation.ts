import { useNavigate } from "react-router-dom";

export function useStudentNavigation() {
  const navigate = useNavigate();
  return {
    goBack: () => navigate(-1),
    goToDetail: (id: number) => navigate(`/students/${id}`),
    goToEdit: (id: number) => navigate(`/students/${id}/edit`),
    goToList: () => navigate("/"),
    goToNew: () => navigate("/students/new"),
  };
}

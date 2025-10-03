import { useParams } from "react-router-dom";

export function useStudentIdParam() {
  const { id } = useParams<{ id?: string }>();
  const parsed = id ? Number.parseInt(id, 10) : null;
  return Number.isFinite(parsed) ? (parsed as number) : null;
}

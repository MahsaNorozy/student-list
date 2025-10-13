import { ADD_STUDENT, UPDATE_STUDENT } from "../../../graphql/mutations";
import { GET_STUDENT, GET_STUDENTS } from "../../../graphql/queries";
import { Gender } from "../../../types/gender";
import { stripTypenameDeep } from "../../../utils/clean";
import "./StudentForm.css";
import { useMutation, useQuery } from "@apollo/client/react";
import React, { useEffect, useState } from "react";

import type { Grade, Student } from "../../../types";

interface Props {
  onCancel: () => void;
  onSaved?: () => void;
  studentId: null | number; // null => Add, Zahl => Edit
}

export const GenderLabel: Record<Gender, string> = {
  [Gender.Divers]: "divers",
  [Gender.Female]: "weiblich",
  [Gender.Male]: "männlich",
  [Gender.Unknown]: "Unbekannt",
};

// --- Form-Model ---
const emptyGrade: Grade = {
  courseName: "",
  date: "",
  gradeValue: "",
  isPassed: false,
};

type FormShape = Omit<Student, "id">; // entspricht Typ ohne id

const emptyStudent: FormShape = {
  address: "",
  email: "",
  gender: Gender.Unknown,
  grades: [],
  matriculationNumber: "",
  name: "",
  program: "",
  semester: 1,
};

const StudentForm: React.FC<Props> = ({ onCancel, onSaved, studentId }) => {
  const isEdit = !!studentId;

  // Daten fürs Edit laden
  const { data: editData } = useQuery<{ student: Student }>(GET_STUDENT, {
    skip: !isEdit,
    variables: { id: studentId! },
  });

  const [form, setForm] = useState<FormShape>(emptyStudent);
  const [grades, setGrades] = useState<Grade[]>([]);

  useEffect(() => {
    if (isEdit && editData?.student) {
      const { id, ...rest } = editData.student;
      // direkt bereinigt in den State
      setForm(stripTypenameDeep(rest));
      setGrades(stripTypenameDeep(editData.student.grades) as Grade[]);
    } else if (!isEdit) {
      setForm(emptyStudent);
      setGrades([]);
    }
  }, [isEdit, editData]);

  const [addStudent, { loading: adding }] = useMutation(ADD_STUDENT, {
    refetchQueries: [{ query: GET_STUDENTS }], // Liste neu laden
  });

  const [updateStudent, { loading: updating }] = useMutation(UPDATE_STUDENT, {
    awaitRefetchQueries: true,
    refetchQueries: [
      { query: GET_STUDENTS },
      { query: GET_STUDENT, variables: { id: studentId } },
    ],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "semester" ? Number(value) : value,
    }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, gender: e.target.value as Gender }));
  };

  // Grades Handling
  const handleGradeChange = (
    idx: number,
    field: keyof Grade,
    value: boolean | string
  ) => {
    setGrades((prev) =>
      prev.map((g, i) => (i === idx ? { ...g, [field]: value } : g))
    );
  };

  const addGrade = () => setGrades([...grades, { ...emptyGrade }]);

  const removeGrade = (idx: number) =>
    setGrades(grades.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const input = stripTypenameDeep({ ...form, grades });
      if (isEdit) {
        await updateStudent({ variables: { id: studentId, input } });
      } else {
        await addStudent({ variables: { input } });
      }
      onSaved?.();
    } catch (err) {
      console.error(err);
      alert("Speichern fehlgeschlagen.");
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? "Student bearbeiten" : "Student hinzufügen"}</h2>

      <input
        name="name"
        onChange={handleChange}
        placeholder="Name"
        required
        value={form.name}
      />
      <input
        name="email"
        onChange={handleChange}
        placeholder="E-Mail"
        required
        value={form.email}
      />
      <input
        name="address"
        onChange={handleChange}
        placeholder="Adresse"
        required
        value={form.address}
      />
      <input
        name="program"
        onChange={handleChange}
        placeholder="Studiengang"
        required
        value={form.program}
      />
      <input
        name="matriculationNumber"
        onChange={handleChange}
        placeholder="Matrikelnummer"
        required
        value={form.matriculationNumber}
      />
      <input
        min={1}
        name="semester"
        onChange={handleChange}
        placeholder="Semester"
        required
        type="number"
        value={form.semester}
      />

      <select name="gender" onChange={handleGenderChange} value={form.gender}>
        <option value={Gender.Male}>{GenderLabel[Gender.Male]}</option>
        <option value={Gender.Female}>{GenderLabel[Gender.Female]}</option>
        <option value={Gender.Divers}>{GenderLabel[Gender.Divers]}</option>
        <option value={Gender.Unknown}>{GenderLabel[Gender.Unknown]}</option>
      </select>

      <h3>Notenspiegel</h3>

      {grades.map((grade, idx) => (
        <div className="grade-block" key={idx}>
          <button
            className="grade-remove-btn"
            onClick={() => removeGrade(idx)}
            title="Diesen Kurs entfernen"
            type="button"
          >
            ✖
          </button>

          <input
            onChange={(e) =>
              handleGradeChange(idx, "courseName", e.target.value)
            }
            placeholder="Kursname"
            required
            type="text"
            value={grade.courseName}
          />

          <input
            onChange={(e) =>
              handleGradeChange(idx, "gradeValue", e.target.value)
            }
            placeholder="Note"
            required
            type="text"
            value={grade.gradeValue}
          />

          <input
            onChange={(e) => handleGradeChange(idx, "date", e.target.value)}
            required
            type="date"
            value={grade.date}
          />

          <div className="grade-passed-row">
            <input
              checked={grade.isPassed}
              id={`passed-${idx}`}
              onChange={(e) =>
                handleGradeChange(idx, "isPassed", e.target.checked)
              }
              type="checkbox"
            />
            <label htmlFor={`passed-${idx}`}> Bestanden</label>
          </div>
        </div>
      ))}

      <div className="add-grade-row">
        <button onClick={addGrade} type="button">
          Note hinzufügen
        </button>
      </div>

      <div className="form-actions">
        <button disabled={adding || updating} type="submit">
          {isEdit ? "Speichern" : "Hinzufügen"}
        </button>

        <button onClick={onCancel} type="button">
          Abbrechen
        </button>
      </div>
    </form>
  );
};

export default StudentForm;

// https://rules.sonarsource.com/typescript/tag/react/RSPEC-6853/

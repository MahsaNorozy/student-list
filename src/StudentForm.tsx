import { Gender } from "./types/Gender";
import React, { useState } from "react";

import type { Grade, Student } from "./types";
import "./styles/StudentForm.css";

type Props = {
  onCancel: () => void;
  onSave: (student: Student) => void;
  student: null | Student;
};

const emptyGrade: Grade = {
  courseName: "",
  date: "",
  grade: "",
  isPassed: false,
};

const emptyStudent: Omit<Student, "id"> = {
  address: "",
  email: "",
  gender: Gender.Unknown,
  grades: [],
  matriculationNumber: "",
  name: "",
  photoUrl: "",
  program: "",
  semester: 1,
};

const StudentForm: React.FC<Props> = ({ onCancel, onSave, student }) => {
  const [form, setForm] = useState<Omit<Student, "id">>(
    student ? { ...student } : emptyStudent
  );
  const [grades, setGrade] = useState<Grade[]>(student ? student.grades : []);

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
    setGrade((prev) =>
      prev.map((g, i) => (i === idx ? { ...g, [field]: value } : g))
    );
  };

  const addGrade = () => setGrade([...grades, { ...emptyGrade }]);
  const removeGrade = (idx: number) =>
    setGrade(grades.filter((_, i) => i !== idx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(student ? { id: student.id } : {}),
      ...form,
      grades,
    } as Student);
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>{student ? "Student bearbeiten" : "Student hinzufügen"}</h2>
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
      {/* Foto-URL entfernt */}
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
        <option value={Gender.Male}>männlich</option>
        <option value={Gender.Female}>weiblich</option>
        <option value={Gender.Divers}>divers</option>
        <option value={Gender.Unknown}>Unbekannt</option>
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
            onChange={(e) => handleGradeChange(idx, "grade", e.target.value)}
            placeholder="Note"
            required
            type="text"
            value={grade.grade}
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
        <button type="submit">{student ? "Speichern" : "Hinzufügen"}</button>
        <button onClick={onCancel} type="button">
          Abbrechen
        </button>
      </div>
    </form>
  );
};

export default StudentForm;

// https://rules.sonarsource.com/typescript/tag/react/RSPEC-6853/

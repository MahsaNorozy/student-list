import { Gender } from "./types/Gender";
import React, { useState } from "react";

import type { Grade, Student } from "./types";

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
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#f6fafe",
        border: "1px solid #ddd",
        borderRadius: 8,
        margin: "24px auto",
        maxWidth: 400,
        padding: 16,
      }}
    >
      <h2>{student ? "Student bearbeiten" : "Student hinzufügen"}</h2>
      <input
        name="name"
        onChange={handleChange}
        placeholder="Name"
        required
        style={{ marginBottom: 8, width: "100%" }}
        value={form.name}
      />
      <input
        name="email"
        onChange={handleChange}
        placeholder="E-Mail"
        required
        style={{ marginBottom: 8, width: "100%" }}
        value={form.email}
      />
      {/*<input
        name="photoUrl"
        onChange={handleChange}
        placeholder="Foto-URL"
        required
        style={{ marginBottom: 8, width: "100%" }}
        value={form.photoUrl}
      />*/}
      <input
        name="address"
        onChange={handleChange}
        placeholder="Adresse"
        required
        style={{ marginBottom: 8, width: "100%" }}
        value={form.address}
      />
      <input
        name="program"
        onChange={handleChange}
        placeholder="Studiengang"
        required
        style={{ marginBottom: 8, width: "100%" }}
        value={form.program}
      />
      <input
        name="matriculationNumber"
        onChange={handleChange}
        placeholder="Matrikelnummer"
        required
        style={{ marginBottom: 8, width: "100%" }}
        value={form.matriculationNumber}
      />
      <input
        min={1}
        name="semester"
        onChange={handleChange}
        placeholder="Semester"
        required
        style={{ marginBottom: 8, width: "100%" }}
        type="number"
        value={form.semester}
      />
      <select
        name="gender"
        onChange={handleGenderChange}
        style={{ marginBottom: 8, width: "100%" }}
        value={form.gender}
      >
        <option value={Gender.Male}>männlich</option>
        <option value={Gender.Female}>weiblich</option>
        <option value={Gender.Divers}>divers</option>
        <option value={Gender.Unknown}>Unbekannt</option>
      </select>
      <h3>Notenspiegel</h3>
      {grades.map((grade, idx) => (
        <div
          key={idx}
          style={{
            border: "1px solid #eee",
            borderRadius: 4,
            marginBottom: 8,
            padding: 6,
          }}
        >
          <input
            onChange={(e) =>
              handleGradeChange(idx, "courseName", e.target.value)
            }
            placeholder="Kursname"
            required
            style={{ marginRight: 4, width: "42%" }}
            value={grade.courseName}
          />
          <input
            onChange={(e) => handleGradeChange(idx, "grade", e.target.value)}
            placeholder="Note"
            required
            style={{ marginRight: 4, width: "18%" }}
            value={grade.grade}
          />
          <input
            onChange={(e) => handleGradeChange(idx, "date", e.target.value)}
            required
            style={{ marginRight: 4, width: "26%" }}
            type="date"
            value={grade.date}
          />
          <input
            checked={grade.isPassed}
            onChange={(e) =>
              handleGradeChange(idx, "isPassed", e.target.checked)
            }
            type="checkbox"
          />
          <label> Bestanden</label>{" "}
          <button
            onClick={() => removeGrade(idx)}
            style={{ marginLeft: 4 }}
            type="button"
          >
            🗑️
          </button>
        </div>
      ))}
      <button onClick={addGrade} style={{ marginBottom: 8 }} type="button">
        Kurs hinzufügen
      </button>
      <div style={{ marginTop: 12 }}>
        <button style={{ marginRight: 8 }} type="submit">
          {student ? "Speichern" : "Hinzufügen"}
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

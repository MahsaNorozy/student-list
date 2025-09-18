import StudentDetails from "./StudentDetails";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import { Gender } from "./types/Gender";
import React, { useState } from "react";

import type { Student } from "./types";

const initialStudents: Student[] = [
  {
    address: "Musterstraße 1, 12345 Berlin",
    email: "anna@beispiel.de",
    gender: Gender.Female,
    grades: [
      { courseName: "Mathe 1", date: "2024-02-10", grade: "1.3", passed: true },
      {
        courseName: "Programmierung",
        date: "2024-02-15",
        grade: "2.0",
        passed: true,
      },
    ],
    id: 1,
    matriculationNumber: "1234567",
    name: "Anna Schmidt",
    photoUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    program: "Informatik",
    semester: 2,
  },
  {
    address: "Beispielweg 2, 54321 Hamburg",
    email: "max@beispiel.de",
    gender: Gender.Male,
    grades: [
      {
        courseName: "Mechanik",
        date: "2024-03-12",
        grade: "2.3",
        passed: true,
      },
      {
        courseName: "Mathe 1",
        date: "2024-03-18",
        grade: "4.0",
        passed: false,
      },
    ],
    id: 2,
    matriculationNumber: "2345678",
    name: "Max Müller",
    photoUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    program: "Maschinenbau",
    semester: 3,
  },
];

const universityLogo =
  "https://static.vecteezy.com/ti/gratis-vektor/p3/4851939-uni-logo-oder-bildung-logo-konzept-illustration-uni-logo-design-vorlage-vektor.jpg";

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [selectedStudentId, setSelectedStudentId] = useState<null | number>(
    null
  );
  const [editingStudent, setEditingStudent] = useState<null | Student>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSelectStudent = (id: number) => {
    setSelectedStudentId(id);
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleAddStudent = () => {
    setShowForm(true);
    setEditingStudent(null);
    setSelectedStudentId(null);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
    setSelectedStudentId(null);
  };

  const handleSaveStudent = (student: Student) => {
    if (student.id) {
      setStudents((students) =>
        students.map((s) => (s.id === student.id ? student : s))
      );
    } else {
      const newId =
        students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
      setStudents([...students, { ...student, id: newId }]);
    }
    setShowForm(false);
    setEditingStudent(null);
  };

  return (
    <div style={{ margin: "0 auto", maxWidth: 600, textAlign: "center" }}>
      <header style={{ marginBottom: 24 }}>
        <img src={universityLogo} width={120} />
        <h1>Studentenverwaltung</h1>
      </header>
      <button onClick={handleAddStudent} style={{ marginBottom: 12 }}>
        Student hinzufügen
      </button>
      <StudentList
        onSelect={handleSelectStudent}
        selectedId={selectedStudentId}
        students={students}
      />
      {showForm && (
        <StudentForm
          onCancel={() => {
            setShowForm(false);
            setEditingStudent(null);
          }}
          onSave={handleSaveStudent}
          student={editingStudent}
        />
      )}
      {selectedStudentId && (
        <StudentDetails
          onEdit={handleEditStudent}
          student={students.find((s) => s.id === selectedStudentId)!}
        />
      )}
    </div>
  );
};

export default App;

// about useState: Page 68

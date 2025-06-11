// src/StudentListFakeClean.tsx
import { useState } from "react";

type Student = {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
};

export default function StudentList() {
  const [students] = useState<Student[]>([
    { name: "Anna", age: 20, gender: "female" },
    { name: "Ben", age: 22, gender: "male" },
    { name: "Chris", age: 21, gender: "other" },
  ]);

  const [selectedName, setSelectedName] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student List</h1>
      {students.map((student) => (
        <div
          key={student.name}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <p>Name: {student.name}</p>
          <p>Age: {student.age}</p>
          <p>Gender: {student.gender}</p>
          <button onClick={() => setSelectedName(student.name)}>
            Show Name
          </button>
          {selectedName === student.name && (
            <p style={{ fontWeight: "bold" }}>{student.name} selected</p>
          )}
        </div>
      ))}
    </div>
  );
}

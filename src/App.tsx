import StudentDetails from "./StudentDetails";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import React, { useState } from "react";
import "./styles/App.css";

const universityLogo =
  "https://static.vecteezy.com/ti/gratis-vektor/p3/4851939-uni-logo-oder-bildung-logo-konzept-illustration-uni-logo-design-vorlage-vektor.jpg";

const App: React.FC = () => {
  const [selectedStudentId, setSelectedStudentId] = useState<null | number>(
    null
  );
  const [editingStudentId, setEditingStudentId] = useState<null | number>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSelectStudent = (id: number) => {
    setSelectedStudentId(id);
    setShowForm(false);
    setEditingStudentId(null);
  };

  const handleAddStudent = () => {
    setShowForm(true);
    setEditingStudentId(null); // Neuer Student
    setSelectedStudentId(null);
  };

  const handleEditStudent = (id: number) => {
    setEditingStudentId(id); // Bestehender Student
    setShowForm(true);
    setSelectedStudentId(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <img alt="Uni Logo" className="app-logo" src={universityLogo} />
        <h1>Studentenverwaltung</h1>
      </header>

      <button className="app-add-btn" onClick={handleAddStudent}>
        Student hinzufügen
      </button>

      <StudentList
        onSelect={handleSelectStudent}
        selectedId={selectedStudentId}
      />

      {showForm && (
        <StudentForm
          onCancel={() => {
            setShowForm(false);
            setEditingStudentId(null);
          }}
          onSaved={() => {
            setShowForm(false);
            setEditingStudentId(null);
          }}
          studentId={editingStudentId} //  optional ID, sonst "Add"
        />
      )}

      {selectedStudentId && (
        <StudentDetails
          onEdit={handleEditStudent}
          studentId={selectedStudentId} // nur ID übergeben
        />
      )}
    </div>
  );
};

export default App;

// about useState: Page 68

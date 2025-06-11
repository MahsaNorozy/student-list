/**
 * StudentListSmells.tsx
 * Example React + TypeScript component deliberately containing several code smells
 *   – Any Type
 *   – Many Non‑Null Assertions
 *  *   – Missing Union Type Abstraction
 *   – Enum Implicit Values
 */

import React, { useState, useEffect, useRef } from "react";

/**
 * ❌  Enum without explicit values
 *     If you insert a new member above an existing one, their numeric values change,
 *     which can break persistence / integrations.
 */
enum StudentStatus {
  Active,
  Suspended,
  Graduated,
}

interface Student {
  id: number;
  name: string;
  age: number;
  status: StudentStatus;
}

/**
 * Renders a list of students and demonstrates multiple code smells
 */
export default function StudentList() {
  /**
   * ❌  'any' disables type checking for student data.
   */
  const [students, setStudents] = useState<any>(null);

  /**
   * ❌  'null' can be valid, but we’ll assert away that possibility later.
   */
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Simulate async fetch
    setTimeout(() => {
      setStudents([
        { id: 1, name: "Alice", age: 22, status: StudentStatus.Active },
        { id: 2, name: "Bob", age: 24, status: StudentStatus.Suspended },
      ]);
    }, 1000);
  }, []);

  /**
   * ❌  Repeating the same union type everywhere instead of a shared alias.
   *     When you need to change it you must touch every occurrence.
   */
  const filterStudents = (query: string | number | boolean) => {
    return (students as any[])!.filter((s) =>
      String(s.name).toLowerCase().includes(String(query).toLowerCase())
    );
  };

  return (
    <div>
      <h2>Students</h2>
      {/* ❌  Non‑null assertion – will crash if students is still null */}
      <ul ref={listRef}>
        {(students as Student[])!.map((s) => (
          <li key={s.id}>
            {s.name} ({s.age}) – {StudentStatus[s.status]}
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          // ❌  Repeated union type again
          const results = filterStudents("alice" as string | number | boolean);
          console.log("Filtered:", results!);
          /**
           * ❌  Non‑null assertion on ref – assumes listRef.current exists.
           */
          listRef.current!.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Filter "alice"
      </button>
    </div>
  );
}

/**
 * Auxiliary component that repeats the union type smell.
 */
export function StudentFilter({
  onFilter,
}: {
  onFilter: (query: string | number | boolean) => void;
}) {
  const [query, setQuery] = useState<string | number | boolean>("");

  return (
    <div>
      <input
        value={query as string}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => onFilter(query)}>Filter</button>
    </div>
  );
}

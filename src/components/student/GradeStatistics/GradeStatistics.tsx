import React from "react";

import type { Grade } from "../../../types";
import "./GradeStatistics.css";

// Berechnung
function calculateStatistics(grades: Grade[]) {
  console.log("🔄 calculateStatistics läuft");

  const validGrades = grades
    .map((g) => parseFloat(g.gradeValue))
    .filter((v) => !isNaN(v) && v > 0);

  if (validGrades.length === 0) {
    return {
      average: "—",
      best: "—",
      failed: 0,
      passed: 0,
      total: 0,
      worst: "—",
    };
  }

  const sum = validGrades.reduce((acc, v) => acc + v, 0);
  const average = (sum / validGrades.length).toFixed(2);
  const best = Math.min(...validGrades).toFixed(2);
  const worst = Math.max(...validGrades).toFixed(2);
  const passed = grades.filter((g) => g.isPassed).length;
  const failed = grades.length - passed;

  return {
    average,
    best,
    failed,
    passed,
    total: grades.length,
    worst,
  };
}

interface Props {
  grades: Grade[];
}

const GradeStatistics: React.FC<Props> = ({ grades }) => {
  // PROBLEM: wird bei JEDEM Render neu berechnet
  // (auch wenn User nur im Name-Feld tippt)
  const stats = calculateStatistics(grades);

  // React.memo: Überspringt Render wenn grades sich nicht ändert
  // const stats = useMemo(() => calculateStatistics(grades), [grades]);

  return (
    <div className="grade-statistics">
      <h3>📊 Notenübersicht</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Durchschnitt:</span>
          <span className="stat-value">{stats.average}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Beste Note:</span>
          <span className="stat-value">{stats.best}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Schlechteste Note:</span>
          <span className="stat-value">{stats.worst}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Bestanden:</span>
          <span className="stat-value">
            {stats.passed} / {stats.total}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Nicht bestanden:</span>
          <span className="stat-value">{stats.failed}</span>
        </div>
      </div>
    </div>
  );
};

// export default GradeStatistics;

// React.memo: Überspringt Render wenn grades sich nicht ändert
export default React.memo(GradeStatistics);

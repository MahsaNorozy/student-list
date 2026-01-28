import React, { useMemo, useState } from "react";

import type { Grade } from "../../../types";
import "./GradeStatistics.css";

function calculateStatistics(grades: Grade[]) {
  console.log("🔄 calculateStatistics läuft");

  const validGrades = grades
    .map((grade) => parseFloat(grade.gradeValue))
    .filter((numericValue) => !isNaN(numericValue) && numericValue > 0);

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
  console.log("🔄 GradeStatistics rendered");

  // Lokaler UI-State, der NICHT von grades abhängt
  const [showStatisticsDetails, setShowStatisticsDetails] = useState(false);

  // ✅ useMemo: Berechnung läuft nur, wenn sich grades ändert
  const statistics = useMemo(() => calculateStatistics(grades), [grades]);
  // const statistics = calculateStatistics(grades);

  return (
    <div className="grade-statistics">
      <h3>📊 Notenübersicht</h3>

      <button
        className="toggle-details-button"
        onClick={() => setShowStatisticsDetails((prev) => !prev)}
        type="button"
      >
        {showStatisticsDetails ? "Details ausblenden" : "Details anzeigen"}
      </button>

      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Durchschnitt:</span>
          <span className="stat-value">{statistics.average}</span>
        </div>

        {showStatisticsDetails && (
          <>
            <div className="stat-item">
              <span className="stat-label">Beste Note:</span>
              <span className="stat-value">{statistics.best}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Schlechteste Note:</span>
              <span className="stat-value">{statistics.worst}</span>
            </div>
          </>
        )}

        <div className="stat-item">
          <span className="stat-label">Bestanden:</span>
          <span className="stat-value">
            {statistics.passed} / {statistics.total}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Nicht bestanden:</span>
          <span className="stat-value">{statistics.failed}</span>
        </div>
      </div>
    </div>
  );
};

// ✅ React.memo: rendert nur neu, wenn sich props (grades) ändern
export default React.memo(GradeStatistics);
// export default GradeStatistics;

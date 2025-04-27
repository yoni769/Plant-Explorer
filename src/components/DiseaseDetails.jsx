import React from 'react';

const DiseaseDetails = ({ disease, onBack }) => {
  if (!disease) return <p>❌ אין מידע זמין</p>;

  return (
    <div className="disease-details">
      <button className="back-btn" onClick={onBack}>
        ⬅️ חזור לרשימת המחלות
      </button>
      <h2>⚕️ {disease.name}</h2>
      <p><strong>תיאור:</strong> {disease.description}</p>
    </div>
  );
};

export default DiseaseDetails;

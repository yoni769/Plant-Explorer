import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = "sk-LSPd67a5f42bd86ca8535";

const PlantDiseaseList = ({ plantId, onDiseaseClick, onBack }) => {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://perenual.com/api/species/diseases-list?plant_id=${plantId}&key=${API_KEY}`)
      .then(response => {
        console.log("Response for diseases:", response.data);
        setDiseases(response.data.data || []);
      })
      .catch(error => {
        console.error('Error fetching diseases:', error);
      })
      .finally(() => setLoading(false));
  }, [plantId]);

  return (
    <div className="plant-disease-list">
      <button className="back-btn" onClick={onBack}>
        ⬅️ חזור לפרטי הצמח
      </button>
      <h2>⚕️ מחלות הצמח</h2>
      {loading ? (
        <p className="loading">🔄 טוען...</p>
      ) : diseases.length === 0 ? (
        <p>❌ אין מחלות זמינות.</p>
      ) : (
        <ul>
          {diseases.map(disease => (
            <li 
              key={disease.id} 
              onClick={() => onDiseaseClick(disease)}
            >
              {disease.name || "שם לא זמין"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlantDiseaseList;

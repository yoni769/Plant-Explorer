import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = "sk-LSPd67a5f42bd86ca8535";

const PlantDetails = ({ plant, onShowDiseases, onBack }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://perenual.com/api/species/details/${plant.id}?key=${API_KEY}`)
      .then(response => {
        setDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching plant details:', error);
      })
      .finally(() => setLoading(false));
  }, [plant.id]);

  if (loading) return <p className="loading">🔄 טוען פרטי הצמח...</p>;

  return (
    <div className="plant-details">
      <button className="back-btn" onClick={onBack}>
        ⬅️ חזור לרשימת הצמחים
      </button>
      {}
      <h2 className="plant-title">{details?.common_name || "שם לא זמין"}</h2>
      <p>
        <strong>שם מדעי:</strong> {details?.scientific_name || "לא זמין"}
      </p>
      <p>
  <strong>שם נוסף:</strong> 
  {details?.other_name && details.other_name.length > 0 && details.other_name.some(name => name.trim() !== "") 
    ? details.other_name.join(", ") 
    : "לא זמין"}
</p>

      <p>
        <strong>משפחה:</strong> {details?.family || "לא זמין"}
      </p>
      <p>
        <strong>תיאור:</strong> {details?.description || "לא זמין"}
      </p>
      {details?.watering && (
        <p>
          <strong>השקיה:</strong> {details.watering}
        </p>
      )}
      {details?.sunlight && (
        <p>
          <strong>חשיפה לשמש:</strong> {details.sunlight}
        </p>
      )}
      {details?.bloom_time && (
        <p>
          <strong>תקופת פריחה:</strong> {details.bloom_time}
        </p>
      )}
      {details?.mature_height && (
        <p>
          <strong>גובה מבוגר:</strong> {details.mature_height}
        </p>
      )}
      {details?.mature_spread && (
        <p>
          <strong>רוחב מבוגר:</strong> {details.mature_spread}
        </p>
      )}
      {typeof details?.is_toxic !== 'undefined' && (
        <p>
          <strong>רעילות:</strong> {details.is_toxic ? "רעיל" : "לא רעיל"}
        </p>
      )}
      {details?.flower_color && (
        <p>
          <strong>צבע פרח:</strong> {details.flower_color}
        </p>
      )}
      {details?.growth_rate && (
        <p>
          <strong>קצב גדילה:</strong> {details.growth_rate}
        </p>
      )}
      {details?.maintenance && (
        <p>
          <strong>תחזוקה:</strong> {details.maintenance}
        </p>
      )}
      {}
      {(details?.temperature_min || details?.temperature_max) && (
        <p>
          <strong>טמפרטורה:</strong> {details.temperature_min || "N/A"} - {details.temperature_max || "N/A"}°C
        </p>
      )}
      {details?.image_url && (
        <img 
          src={details.image_url} 
          alt={details.common_name} 
          className="plant-image" 
        />
      )}

      <button className="disease-btn" onClick={onShowDiseases}>
        ⚕️ הצג מחלות
      </button>
    </div>
  );
};

export default PlantDetails;

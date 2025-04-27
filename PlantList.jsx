import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = "sk-LSPd67a5f42bd86ca8535";
const MAX_RETRIES = 3;

const PlantList = ({ onPlantSelect }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [nonToxicOnly, setNonToxicOnly] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlants = async (searchQuery, currentPage, nonToxic, retryCount = 0) => {
    setLoading(true);
    setError(null);
    let url = `https://perenual.com/api/species-list?key=${API_KEY}&page=${currentPage}`;
    if (searchQuery.trim() !== "") {
      url += `&q=${encodeURIComponent(searchQuery)}`;
    }
    if (nonToxic) {
      url += `&is_toxic=false`;
    }
    console.log("Requesting URL:", url);

    try {
      const response = await axios.get(url);
      console.log("API response:", response.data);
      const fetchedPlants = response.data.data || [];
      setPlants(fetchedPlants);
    } catch (err) {
      console.error("Error fetching plants:", err);
      if (err.response && err.response.status === 429) {
        if (retryCount < MAX_RETRIES) {
          const delay = (retryCount + 1) * 300; // 300ms, 600ms, 900ms
          console.log(`Received 429, retrying after ${delay}ms... (attempt ${retryCount + 1})`);
          setTimeout(() => {
            fetchPlants(searchQuery, currentPage, nonToxic, retryCount + 1);
          }, delay);
          return;
        } else {
          setError("429 Too Many Requests: אנא המתן לפני ניסיון נוסף.");
        }
      } else {
        setError("אירעה שגיאה בעת טעינת הנתונים.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants(query, page, nonToxicOnly);
  }, [query, page, nonToxicOnly]);

  return (
    <div className="plant-list-container">
      <h2>🌱 רשימת הצמחים</h2>
      
      <div className="search-filter">
        <input
          type="text"
          placeholder="🔎 חפש צמח..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="search-input"
        />
        <label>
          <input
            type="checkbox"
            checked={nonToxicOnly}
            onChange={(e) => {
              setNonToxicOnly(e.target.checked);
              setPage(1);
            }}
          />
          צמחים שאינם רעילים בלבד
        </label>
      </div>

      {loading && <p className="loading">🔄 טוען נתונים...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && plants.length === 0 && (
        <p className="no-results">❌ לא נמצאו צמחים.</p>
      )}
      {!loading && !error && plants.length > 0 && (
        <ul className="plant-list">
          {plants.map(plant => (
            <li 
              key={plant.id} 
              onClick={() => onPlantSelect(plant)} 
              className="plant-item"
            >
              {plant.common_name || "שם לא זמין"}
            </li>
          ))}
        </ul>
      )}

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          ⬅️ הקודם
        </button>
        <span>עמוד {page}</span>
        <button onClick={() => setPage(page + 1)}>
          ➡️ הבא
        </button>
      </div>
    </div>
  );
};

export default PlantList;

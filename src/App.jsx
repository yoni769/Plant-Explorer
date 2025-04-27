import React, { useState } from 'react';
import PlantList from './components/PlantList';
import PlantDetails from './components/PlantDetails';
import PlantDiseaseList from './components/PlantDiseaseList';
import DiseaseDetails from './components/DiseaseDetails';

const App = () => {
  
  const [view, setView] = useState('plantList');
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState(null);

  const handlePlantSelect = (plant) => {
    setSelectedPlant(plant);
    setView('plantDetails');
  };

  const handleBackToList = () => {
    setSelectedPlant(null);
    setSelectedDisease(null);
    setView('plantList');
  };

  const handleShowDiseases = () => {
    setView('diseaseList');
  };

  const handleDiseaseSelect = (disease) => {
    setSelectedDisease(disease);
    setView('diseaseDetails');
  };

  const handleBackToPlantDetails = () => {
    setView('plantDetails');
  };

  const handleBackToDiseaseList = () => {
    setView('diseaseList');
  };

  return (
    <div className="app-container">
      {view === 'plantList' && (
        <PlantList onPlantSelect={handlePlantSelect} />
      )}
      {view === 'plantDetails' && selectedPlant && (
        <PlantDetails 
          plant={selectedPlant} 
          onShowDiseases={handleShowDiseases}
          onBack={handleBackToList}
        />
      )}
      {view === 'diseaseList' && selectedPlant && (
        <PlantDiseaseList 
          plantId={selectedPlant.id} 
          onDiseaseClick={handleDiseaseSelect}
          onBack={handleBackToPlantDetails}
        />
      )}
      {view === 'diseaseDetails' && selectedDisease && (
        <DiseaseDetails 
          disease={selectedDisease} 
          onBack={handleBackToDiseaseList}
        />
      )}
    </div>
  );
};

export default App;

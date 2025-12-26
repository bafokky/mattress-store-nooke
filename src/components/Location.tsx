import React from "react";
import LocationDisplay from "./LocationDisplay";
import MapComponent from "./MapComponent";
import "../styles/location.css";

const Location: React.FC = () => {
  return (
    <div className="location-details-container1">
      <div className="location-details-container2">
        <p className="location-title-text-style">Наше местоположение</p>
        <div className="location-details-container">
          <LocationDisplay />
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default Location;
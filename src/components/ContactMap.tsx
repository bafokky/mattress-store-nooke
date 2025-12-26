import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const mapCenter: [number, number] = [54.477476, 26.403198]; 

const ContactMap: React.FC = () => {
  return (
    <YMaps>
      <Map
        defaultState={{
          center: mapCenter,
          zoom: 15, 
        }}
        width="100%" 
        height="400px"
      >
      <Placemark geometry={mapCenter} />
      </Map>
    </YMaps>
  );
};

export default ContactMap;
// src/components/Map.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({
  startLocation,
  endLocation,
  startLocationName,
  endLocationName,
}) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "200px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {startLocation && (
        <Marker position={[startLocation.lat, startLocation.lng]}>
          <Popup>{startLocationName}</Popup>
        </Marker>
      )}
      {endLocation && (
        <Marker position={[endLocation.lat, endLocation.lng]}>
          <Popup>{endLocationName}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;

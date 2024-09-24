import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./DayInput.css";
import { useNavigate } from "react-router-dom";

const DayInput = ({ day, updateDayData }) => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    vehicleType: "",
    vehicleBrand: "",
    fuelType: "",
    startLocationName: "",
    endLocationName: "",
    startTime: "",
    kilometers: "",
    startLocation: null,
    endLocation: null,
    city: "",
  });

  const [locationOptions, setLocationOptions] = useState([]);
  const navigate = useNavigate();

  // Define custom icons
  const startIcon = new L.Icon({
    iconUrl: "start_icon_url",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const endIcon = new L.Icon({
    iconUrl: "end_icon_url",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const handleInputChange = (field, value) => {
    setCurrentEntry((prevEntry) => ({
      ...prevEntry,
      [field]: value,
    }));
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    handleInputChange("city", city);
    setLocationOptions(cityLocations[city] || []);
    handleInputChange("startLocationName", "");
    handleInputChange("endLocationName", "");
  };

  const handleVehicleTypeChange = (e) => {
    handleInputChange("vehicleType", e.target.value);
    handleInputChange("vehicleBrand", "");
  };

  const handleAddEntry = () => {
    if (currentEntry.startLocation && currentEntry.endLocation) {
      setEntries((prevEntries) => [...prevEntries, currentEntry]);
      setCurrentEntry({
        vehicleType: "",
        vehicleBrand: "",
        fuelType: "",
        startLocationName: "",
        endLocationName: "",
        startTime: "",
        kilometers: "",
        startLocation: null,
        endLocation: null,
        city: "",
      });
    } else {
      alert("Please calculate the distance before adding an entry.");
    }
  };

  const handleCalculateDistance = async () => {
    const startCoords = await getCoordinates(currentEntry.startLocationName);
    const endCoords = await getCoordinates(currentEntry.endLocationName);

    if (startCoords && endCoords) {
      const distance = haversineDistance(
        startCoords.lat,
        startCoords.lng,
        endCoords.lat,
        endCoords.lng
      );

      const newEntry = {
        ...currentEntry,
        kilometers: distance.toFixed(2),
        startLocation: startCoords,
        endLocation: endCoords,
        emission: calculateEmission(
          currentEntry.vehicleType,
          currentEntry.fuelType,
          distance
        ),
      };

      setCurrentEntry(newEntry);
    }
  };

  const getCoordinates = async (location) => {
    // Fetch and process coordinates using an API
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => degrees * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateEmission = (vehicleType, fuelType, distance) => {
    const emissionFactors = {
      Car: { Petrol: 2.31, Diesel: 2.68, Electric: 0, CNG: 1.88, JetFuel: 0 },
      // other vehicle types...
    };

    const factor = emissionFactors[vehicleType]?.[fuelType] || 0;
    return (factor * distance).toFixed(2);
  };

  const handleSubmit = () => {
    if (entries.length > 0) {
      updateDayData(day, entries);
      navigate("/results", { state: { entries } });
    } else {
      alert("Please add at least one entry.");
    }
  };

  return (
    <div className="day-input-container">
      {/* Input fields and buttons for the form */}

      <div className="map-container">
        <MapContainer
          center={[13.0827, 80.2707]}
          zoom={12}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {entries.map((entry, index) => (
            <React.Fragment key={index}>
              {entry.startLocation && (
                <Marker
                  position={[entry.startLocation.lat, entry.startLocation.lng]}
                  icon={startIcon}
                >
                  <Popup>{entry.startLocationName}</Popup>
                </Marker>
              )}
              {entry.endLocation && (
                <Marker
                  position={[entry.endLocation.lat, entry.endLocation.lng]}
                  icon={endIcon}
                >
                  <Popup>{entry.endLocationName}</Popup>
                </Marker>
              )}
              {entry.startLocation && entry.endLocation && (
                <Polyline
                  positions={[
                    [entry.startLocation.lat, entry.startLocation.lng],
                    [entry.endLocation.lat, entry.endLocation.lng],
                  ]}
                  color="blue"
                />
              )}
            </React.Fragment>
          ))}
        </MapContainer>
      </div>

      {/* Submit button */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default DayInput;

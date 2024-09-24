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
import { useNavigate } from "react-router-dom";
import "./DayInput.css";

// Geocoding API key
const GEOCODING_API_KEY = "3b5a792b10f14e248d8e19fe34f0fa46"; // Replace with your API key

const vehicleBrands = {
  Car: ["Maruti Suzuki", "Hyundai", "Tata Motors", "Honda", "Ford", "Toyota"],
  Bike: ["Hero", "Bajaj", "Honda", "Royal Enfield", "Yamaha"],
  Scooter: ["Honda", "TVS", "Bajaj", "Hero"],
  Auto: ["Bajaj", "Piaggio", "TVS"],
  Truck: ["Tata Motors", "Ashok Leyland", "Mahindra", "Eicher"],
  Bus: ["Tata Motors", "Ashok Leyland", "Volvo", "Eicher"],
  "MTC Bus": ["MTC"], // Adding MTC Bus
  Flight: ["Air India", "IndiGo", "SpiceJet"], // Adding Flight
};

const fuelTypes = ["Petrol", "Diesel", "Electric", "CNG", "Jet Fuel"]; // Adding "Jet Fuel" for flights

const cities = ["Chennai", "Coimbatore", "Salem", "Vellore"];

const cityLocations = {
  Chennai: [
    "Egmore",
    "Chetpet",
    "Nungambakkam",
    "T-Nagar",
    "Mount Road (Anna Salai)",
    "Chennai Central",
    "Chennai Egmore",
    "Purasaiwalkam",
    "Perambur",
    "Kilpauk",
    "Adyar",
    "Besant Nagar",
    "Thiruvanmiyur",
    "Kotturpuram",
    "Saidapet",
    "Tambaram",
    "Medavakkam",
    "Sholinganallur",
    "Velachery",
    "Mylapore",
    "North Chennai",
    "Aminjikarai",
    "Korukkupet",
    "Vyasarpadi",
    "Tondiarpet",
    "Royapuram",
    "Anna Nagar",
    "Pallavaram",
    "Thiruvottriyur",
    "Ashok Nagar",
    "Marina Beach",
    "Elliot’s Beach",
    "Fort St. George",
    "Santhome Cathedral",
    "Kapaleeshwarar Temple",
    "Government Museum",
    "Birla Planetarium",
    "Valluvar Kottam",
    "Guindy National Park",
    "Chennai Citi Centre",
    "Poonamallee",
    "Porur",
  ],
  Coimbatore: [
    "Coimbatore Junction",
    "Coimbatore North",
    "R.S. Puram",
    "Gandhipuram",
    "Peelamedu",
    "Singanallur",
    "Tidel Park",
    "Kovai Pudur",
    "Saibaba Colony",
    "Ukkadam",
  ],
  Salem: [
    "Salem New Bus Stand",
    "Salem Junction Railway Station",
    "Hasthampatti",
    "Old Bus Stand Area",
    "Anna Park",
    "Gandhi Stadium",
    "Five Roads Junction",
    "Omalur",
    "Kuranguchavadi",
  ],
  Vellore: [
    "Katpadi",
    "Sathuvachari",
    "Gandhinagar",
    "Thorapadi",
    "Arcot",
    "Gudiyatham",
    "Ranipet",
    "Bagayam",
    "Vaniyambadi",
    "Ambur",
  ],
};

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
    iconUrl:
      "https://i.pinimg.com/564x/fb/3c/f6/fb3cf6d050330195ca80b47fab2f4606.jpg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const endIcon = new L.Icon({
    iconUrl:
      "https://i.pinimg.com/564x/8b/0b/2a/8b0b2aabaacab763e62b8c4ecbac389a.jpg",
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
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          location
        )}&key=${GEOCODING_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return { lat, lng };
      } else {
        alert("Location not found.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      alert("Error fetching coordinates.");
      return null;
    }
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    const R = 6371;
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
      Bike: { Petrol: 1.36, Diesel: 0, Electric: 0, CNG: 1.3, JetFuel: 0 },
      Scooter: { Petrol: 1.46, Diesel: 0, Electric: 0, CNG: 1.5, JetFuel: 0 },
      Auto: { Petrol: 1.55, Diesel: 2.4, Electric: 0, CNG: 1.88, JetFuel: 0 },
      Truck: { Petrol: 2.68, Diesel: 3.0, Electric: 0, CNG: 2.55, JetFuel: 0 },
      Bus: { Petrol: 2.5, Diesel: 2.5, Electric: 0, CNG: 2.7, JetFuel: 0 },
      "MTC Bus": {
        Petrol: 2.5,
        Diesel: 2.5,
        Electric: 0,
        CNG: 2.7,
        JetFuel: 0,
      },
      Flight: { Petrol: 0, Diesel: 0, Electric: 0, CNG: 0, JetFuel: 2.5 },
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
      <div className="entries-table">
        <table>
          <thead>
            <tr>
              <th>Vehicle Type</th>
              <th>Vehicle Brand</th>
              <th>Fuel Type</th>
              <th>Start Location</th>
              <th>End Location</th>
              <th>Start Time</th>
              <th>Kilometers</th>
              <th>Emission (kg CO2)</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.vehicleType}</td>
                <td>{entry.vehicleBrand}</td>
                <td>{entry.fuelType}</td>
                <td>{entry.startLocationName}</td>
                <td>{entry.endLocationName}</td>
                <td>{entry.startTime}</td>
                <td>{entry.kilometers}</td>
                <td>{entry.emission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="input-form">
        <h3>Day {day} Input</h3>

        <div>
          <label>City:</label>
          <select
            value={currentEntry.city}
            onChange={handleCityChange}
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Start Location:</label>
          <select
            value={currentEntry.startLocationName}
            onChange={(e) =>
              handleInputChange("startLocationName", e.target.value)
            }
            required
          >
            <option value="">Select Start Location</option>
            {locationOptions.map((location) => (
              <option
                key={location}
                value={`${currentEntry.city}, ${location}`}
              >
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>End Location:</label>
          <select
            value={currentEntry.endLocationName}
            onChange={(e) =>
              handleInputChange("endLocationName", e.target.value)
            }
            required
          >
            <option value="">Select End Location</option>
            {locationOptions.map((location) => (
              <option
                key={location}
                value={`${currentEntry.city}, ${location}`}
              >
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Vehicle Type:</label>
          <select
            value={currentEntry.vehicleType}
            onChange={handleVehicleTypeChange}
            required
          >
            <option value="">Select Vehicle Type</option>
            {Object.keys(vehicleBrands).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {currentEntry.vehicleType && (
          <div>
            <label>Vehicle Brand:</label>
            <select
              value={currentEntry.vehicleBrand}
              onChange={(e) =>
                handleInputChange("vehicleBrand", e.target.value)
              }
              required
            >
              <option value="">Select Vehicle Brand</option>
              {vehicleBrands[currentEntry.vehicleType].map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label>Fuel Type:</label>
          <select
            value={currentEntry.fuelType}
            onChange={(e) => handleInputChange("fuelType", e.target.value)}
            required
          >
            <option value="">Select Fuel Type</option>
            {fuelTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Start Time:</label>
          <input
            type="time"
            value={currentEntry.startTime}
            onChange={(e) => handleInputChange("startTime", e.target.value)}
            required
          />
        </div>

        <div>
          <button onClick={handleCalculateDistance}>Calculate Distance</button>
        </div>

        <div>
          <label>Kilometers:</label>
          <input
            type="number"
            value={currentEntry.kilometers}
            onChange={(e) => handleInputChange("kilometers", e.target.value)}
            readOnly
          />
        </div>

        <div>
          <button onClick={handleAddEntry}>Add Entry</button>
        </div>
      </div>

      <div className="map-container">
        {currentEntry.startLocation && currentEntry.endLocation && (
          <MapContainer
            center={[
              currentEntry.startLocation.lat,
              currentEntry.startLocation.lng,
            ]}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={currentEntry.startLocation} icon={startIcon}>
              <Popup>Start Location</Popup>
            </Marker>
            <Marker position={currentEntry.endLocation} icon={endIcon}>
              <Popup>End Location</Popup>
            </Marker>
            <Polyline
              positions={[
                [
                  currentEntry.startLocation.lat,
                  currentEntry.startLocation.lng,
                ],
                [currentEntry.endLocation.lat, currentEntry.endLocation.lng],
              ]}
              color="blue"
            />
          </MapContainer>
        )}
      </div>

      <button onClick={handleSubmit}>Submit Day {day} Data</button>
    </div>
  );
};

export default DayInput;

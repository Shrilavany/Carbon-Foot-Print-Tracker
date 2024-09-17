import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./DayInput.css";
import { useNavigate } from "react-router-dom";

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

const cities = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Tiruchirappalli (Trichy)",
  "Salem",
  "Tirunelveli",
  "Vellore",
  "Erode",
  "Dindigul",
  "Thanjavur",
  "Tiruppur",
  "Nagercoil",
  "Cuddalore",
  "Karur",
  "Kanchipuram",
  "Dharmapuri",
  "Hosur",
  "Sivakasi",
  "Nagapattinam",
  "Ramanathapuram",
  "Karaikudi",
  "Perambalur",
  "Virudhunagar",
  "Ariyalur",
  "Tiruvannamalai",
  "Viluppuram",
  "Pudukkottai",
  "Thoothukudi (Tuticorin)",
  "Namakkal",
  "Ooty (Udhagamandalam)",
  "Yercaud",
  "Kovalam",
  "Kanyakumari",
  "Mettur",
  "Sankarankoil",
  "Tirupattur",
  "Vadalur",
  "Kumbakonam",
];

const cityLocations = {
  Chennai: [
    "Egmore",
    "Chetpet",
    "Nungambakkam",
    "T. Nagar (Thyagaraya Nagar)",
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
    "Poonamallee", // Added Poonamallee
    "Porur", // Added Porur
  ],
  // Add mappings for other cities as needed
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
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleInputChange = (field, value) => {
    setCurrentEntry((prevEntry) => ({
      ...prevEntry,
      [field]: value,
    }));
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    handleInputChange("city", city);
    setLocationOptions(cityLocations[city] || []); // Set locations based on selected city
    handleInputChange("startLocationName", ""); // Reset location names
    handleInputChange("endLocationName", "");
  };

  const handleVehicleTypeChange = (e) => {
    handleInputChange("vehicleType", e.target.value);
    handleInputChange("vehicleBrand", ""); // Reset brand when vehicle type changes
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
    const R = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const calculateEmission = (vehicleType, fuelType, kilometers) => {
    const emissionFactors = {
      Car: { Petrol: 0.2, Diesel: 0.25, Electric: 0, CNG: 0.15 },
      Bike: { Petrol: 0.1, Diesel: 0.12, Electric: 0, CNG: 0.08 },
      Scooter: { Petrol: 0.12, Diesel: 0.15, Electric: 0, CNG: 0.1 },
      Auto: { Petrol: 0.15, Diesel: 0.2, Electric: 0, CNG: 0.12 },
      Truck: { Petrol: 0.4, Diesel: 0.5, Electric: 0, CNG: 0.35 },
      Bus: { Petrol: 0.3, Diesel: 0.4, Electric: 0, CNG: 0.25 },
      Flight: { Jet_Fuel: 0.9 }, // Example factor for flights
    };

    return (
      (emissionFactors[vehicleType] && emissionFactors[vehicleType][fuelType]
        ? emissionFactors[vehicleType][fuelType]
        : 0) * kilometers
    ).toFixed(2);
  };

  return (
    <div className="day-input-container">
      <h2>Day {day} Input</h2>

      <label>
        Select City:
        <select value={currentEntry.city} onChange={handleCityChange}>
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>

      <label>
        Vehicle Type:
        <select
          value={currentEntry.vehicleType}
          onChange={handleVehicleTypeChange}
        >
          <option value="">Select a vehicle type</option>
          {Object.keys(vehicleBrands).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      {currentEntry.vehicleType && (
        <label>
          Vehicle Brand:
          <select
            value={currentEntry.vehicleBrand}
            onChange={(e) => handleInputChange("vehicleBrand", e.target.value)}
          >
            <option value="">Select a brand</option>
            {vehicleBrands[currentEntry.vehicleType].map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>
      )}

      {currentEntry.vehicleType && (
        <label>
          Fuel Type:
          <select
            value={currentEntry.fuelType}
            onChange={(e) => handleInputChange("fuelType", e.target.value)}
          >
            <option value="">Select a fuel type</option>
            {fuelTypes.map((fuel) => (
              <option key={fuel} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
        </label>
      )}

      <label>
        Start Location:
        <select
          value={currentEntry.startLocationName}
          onChange={(e) =>
            handleInputChange("startLocationName", e.target.value)
          }
        >
          <option value="">Select a start location</option>
          {locationOptions.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </label>

      <label>
        End Location:
        <select
          value={currentEntry.endLocationName}
          onChange={(e) => handleInputChange("endLocationName", e.target.value)}
        >
          <option value="">Select an end location</option>
          {locationOptions.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </label>

      <button onClick={handleCalculateDistance}>Calculate Distance</button>
      <button onClick={handleAddEntry}>Add Entry</button>

      {entries.length > 0 && (
        <div className="entries-list">
          <h3>Entries</h3>
          <ul>
            {entries.map((entry, index) => (
              <li key={index}>
                <strong>Entry {index + 1}</strong>
                <br />
                Vehicle Type: {entry.vehicleType}
                <br />
                Vehicle Brand: {entry.vehicleBrand}
                <br />
                Fuel Type: {entry.fuelType}
                <br />
                Start Location: {entry.startLocationName} (Lat:{" "}
                {entry.startLocation?.lat}, Lng: {entry.startLocation?.lng})
                <br />
                End Location: {entry.endLocationName} (Lat:{" "}
                {entry.endLocation?.lat}, Lng: {entry.endLocation?.lng})<br />
                Distance: {entry.kilometers} km
                <br />
                Emission: {entry.emission} kg CO2
              </li>
            ))}
          </ul>
        </div>
      )}

      <MapContainer
        center={[13.0827, 80.2707]} // Updated to center around Chennai
        zoom={12}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {entries.map((entry, index) => (
          <>
            {entry.startLocation && (
              <Marker
                key={`start-${index}`}
                position={[entry.startLocation.lat, entry.startLocation.lng]}
              >
                <Popup>Start Location: {entry.startLocationName}</Popup>
              </Marker>
            )}
            {entry.endLocation && (
              <Marker
                key={`end-${index}`}
                position={[entry.endLocation.lat, entry.endLocation.lng]}
              >
                <Popup>End Location: {entry.endLocationName}</Popup>
              </Marker>
            )}
          </>
        ))}
      </MapContainer>
    </div>
  );
};

export default DayInput;

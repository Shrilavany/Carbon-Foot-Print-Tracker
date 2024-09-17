// src/components/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Include the CSS for styling

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [document, setDocument] = useState(null);
  const [bloodGroup, setBloodGroup] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setDocument(file);
      setError("");
    } else {
      setError("Please upload a valid PDF file for Aadhar card.");
    }
  };

  const handleLogin = () => {
    // Basic input validation
    if (!username || !email || !age || !document || !bloodGroup || !gender) {
      setError("All fields are required.");
      return;
    }

    if (age <= 0) {
      setError("Please enter a valid age.");
      return;
    }

    // Store user data in localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("age", age);
    localStorage.setItem("bloodGroup", bloodGroup);
    localStorage.setItem("gender", gender);

    // You can store the document in localStorage as a base64 string if needed
    // For now, we'll just log it to the console
    console.log("Uploaded Aadhar card:", document);

    // Navigate to the homepage after successful login
    navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          >
            <option value="" disabled>
              Select your blood group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={gender === "Other"}
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

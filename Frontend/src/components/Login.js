import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API requests
import "./Login.css"; // Include the CSS for styling

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // New state

  const navigate = useNavigate();

  const handleLogin = async () => {
    // Basic input validation
    if (!username || !email || !age || !bloodGroup || !gender) {
      setError("All fields are required.");
      return;
    }

    if (age <= 0) {
      setError("Please enter a valid age.");
      return;
    }

    // Create the user data object to send to the API
    const userData = {
      username,
      email,
      age,
      bloodGroup,
      gender,
    };

    try {
      // Make POST request to the backend API
      const response = await axios.post(
        "http://localhost:5001/api/register",
        userData
      );

      // Check if registration is successful
      if (response.data.message === "User registered successfully") {
        // Store user data in localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("age", age);
        localStorage.setItem("bloodGroup", bloodGroup);
        localStorage.setItem("gender", gender);

        // Navigate to the homepage after successful registration
        navigate("/home");
      } else {
        // Handle errors from the backend
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      // Handle error during API call
      console.error("There was an error!", error);
      setError(
        "An error occurred during registration. Please try again later."
      );
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalSubmit = () => {
    // Perform any additional checks or updates if necessary
    navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <button className="sign-in-button" onClick={toggleModal}>
          Sign In
        </button>
        <h2>Create Account</h2>
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
          <button onClick={handleLogin}>Register</button>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Sign In</h3>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleModalSubmit}>Let's Go</button>
            <button className="modal-close-button" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

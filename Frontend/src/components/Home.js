import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css"; // Import the CSS file

const Home = () => {
  const [username, setUsername] = useState("");
  const [isScrolling, setIsScrolling] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleImageClick = (imageSrc) => {
    setIsScrolling(false); // Stop scrolling
    setSelectedImage(imageSrc); // Set selected image
  };

  const handleCloseImage = () => {
    setSelectedImage(null); // Clear selected image
    setIsScrolling(true); // Resume scrolling
  };

  return (
    <div className="home-page">
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/activities">Activities</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <h1>Welcome, {username}</h1>
      <div className="carbon-footprint-content">
        <p>
          Our website helps you track the carbon footprint of your daily
          transportation. By monitoring your vehicle usage, you can become more
          aware of your environmental impact and take steps to reduce your
          carbon emissions. Start tracking today and make a positive change for
          the Earth!
        </p>
      </div>
      <button>
        <Link to="/dashboard">Start Tracking</Link>
      </button>
      <div className={`scrolling-container ${isScrolling ? "" : "paused"}`}>
        <div className="scrolling-content">
          {/* Add your images here */}
          <img
            src="https://i.pinimg.com/564x/4a/c1/ae/4ac1ae262fa8eb48c34f66c08fba4cfe.jpg"
            alt="Scrolling Image 1"
            onClick={() =>
              handleImageClick(
                "https://i.pinimg.com/564x/4a/c1/ae/4ac1ae262fa8eb48c34f66c08fba4cfe.jpg"
              )
            }
          />
          <img
            src="https://i.pinimg.com/564x/45/18/f3/4518f329813d6bc393dfcac6aae5320a.jpg"
            alt="Scrolling Image 2"
            onClick={() =>
              handleImageClick(
                "https://i.pinimg.com/564x/45/18/f3/4518f329813d6bc393dfcac6aae5320a.jpg"
              )
            }
          />
          <img
            src="https://i.pinimg.com/564x/38/47/05/3847050c192fb1bc1bb3aaf68af624c4.jpg"
            alt="Scrolling Image 3"
            onClick={() =>
              handleImageClick(
                "https://i.pinimg.com/564x/38/47/05/3847050c192fb1bc1bb3aaf68af624c4.jpg"
              )
            }
          />
          {/* Add more images as needed */}
          <img
            src="https://i.pinimg.com/564x/1e/9d/d8/1e9dd8d1f5173f1e3d333493b9885237.jpg"
            alt="Scrolling Image 4"
            onClick={() =>
              handleImageClick(
                "https://i.pinimg.com/564x/1e/9d/d8/1e9dd8d1f5173f1e3d333493b9885237.jpg"
              )
            }
          />
          <img
            src="https://i.pinimg.com/564x/6f/64/95/6f64953280d5fb1b810c560c7592e58d.jpg"
            alt="Scrolling Image 5"
            onClick={() =>
              handleImageClick(
                "https://i.pinimg.com/564x/6f/64/95/6f64953280d5fb1b810c560c7592e58d.jpg"
              )
            }
          />
          <img
            src="https://i.pinimg.com/564x/64/2b/9e/642b9e285c792348de432c94047689b8.jpg"
            alt="Scrolling Image 6 "
            onClick={() =>
              handleImageClick(
                "https://i.pinimg.com/564x/64/2b/9e/642b9e285c792348de432c94047689b8.jpg"
              )
            }
          />
          <img
            src="https://i.pinimg.com/564x/35/5d/50/355d5074a2cd30d0b4b27cbebced88ad.jpg"
            alt="Scrolling Image 7 "
            onClick={() =>
              handleImageClick(
                "https://i.pinimg.com/564x/35/5d/50/355d5074a2cd30d0b4b27cbebced88ad.jpg"
              )
            }
          />
          <img
            src="https://i.pinimg.com/564x/6d/2d/38/6d2d383f9f4aaa7e99945e47511dca19.jpg"
            alt="Scrolling Image 8 "
            onClick={() =>
              handleImageClick(
                "https://i.pinimg.com/564x/6d/2d/38/6d2d383f9f4aaa7e99945e47511dca19.jpg"
              )
            }
          />
          <img
            src="https://i.pinimg.com/736x/bc/44/c9/bc44c97b7a8643a8a9b40d6952493313.jpg"
            alt="Scrolling Image 9 "
            onClick={() =>
              handleImageClick(
                "https://i.pinimg.com/736x/bc/44/c9/bc44c97b7a8643a8a9b40d6952493313.jpg"
              )
            }
          />
          <img
            src="https://i.pinimg.com/564x/d7/77/93/d77793fd975ab469c124f70c13ad1b87.jpg"
            alt="Scrolling Image 10 "
            onClick={() =>
              handleImageClick(
                "https://i.pinimg.com/564x/d7/77/93/d77793fd975ab469c124f70c13ad1b87.jpg"
              )
            }
          />
          <img
            src="https://i.pinimg.com/564x/1b/7e/15/1b7e15f90327c9e1efaba380019a86c5.jpg"
            alt="Scrolling Image 11"
            onClick={() =>
              handleImageClick(
                "https://i.pinimg.com/564x/1b/7e/15/1b7e15f90327c9e1efaba380019a86c5.jpg"
              )
            }
          />
        </div>
      </div>
      {selectedImage && (
        <div className="selected-image">
          <img src={selectedImage} alt="Selected" />
          <button onClick={handleCloseImage}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Home;

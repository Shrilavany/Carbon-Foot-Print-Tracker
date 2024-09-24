import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Uploaded.css";

function UploadForm({ onPhotoUpload }) {
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Landscape");

  const handlePhotoChange = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (photo) {
      onPhotoUpload({ photo, description, category, likes: 0 });
      setPhoto(null);
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Landscape">Landscape</option>
        <option value="Wildlife">Wildlife</option>
        <option value="Plants">Plants</option>
      </select>

      <input type="file" onChange={handlePhotoChange} />
      <button type="submit">Upload Photo</button>
    </form>
  );
}

export default UploadForm;

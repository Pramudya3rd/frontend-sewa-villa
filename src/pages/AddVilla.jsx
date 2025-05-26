import React, { useState } from "react";
import Navbar from "../components/NavbarProfile";
import "../styles/add-villa.css";

const AddVilla = () => {
  const [formData, setFormData] = useState({
    villaName: "",
    address: "",
    description: "",
    capacity: "",
    price: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [roomFeatures, setRoomFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFeatureChange = (e) => {
    setNewFeature(e.target.value);
  };

  const addFeature = () => {
    if (newFeature.trim() !== "" && !roomFeatures.includes(newFeature.trim())) {
      setRoomFeatures([...roomFeatures, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (feature) => {
    setRoomFeatures(roomFeatures.filter((f) => f !== feature));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const completeData = {
      ...formData,
      features: roomFeatures,
    };
    console.log("Data to submit:", completeData);
    alert("Villa data uploaded!");
    // Logic pengiriman data ke backend bisa ditambahkan di sini
  };

  return (
    <>
      <Navbar />
      <div className="add-villa-container">
        <form onSubmit={handleSubmit} className="add-villa-form">
          <div className="upload-section">
            <label>UPLOAD IMAGES</label>
            <div className="image-placeholder">
              {previewImage ? (
                <img src={previewImage} alt="Villa Preview" />
              ) : (
                <span>No image selected</span>
              )}
            </div>
            <input type="file" name="image" onChange={handleChange} accept="image/*" />
          </div>

          <div className="details-section">
            <label>FILL YOUR DETAILS</label>

            <input
              type="text"
              name="villaName"
              placeholder="Villa Name"
              value={formData.villaName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <div className="inline-inputs">
              <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                value={formData.capacity}
                onChange={handleChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            {/* Room Features Section */}
            <label>ROOM FEATURES</label>
            <div className="inline-inputs">
              <input
                type="text"
                placeholder="Add a feature (e.g., TV, AC)"
                value={newFeature}
                onChange={handleFeatureChange}
                className="feature-input"
              />
              <button
                type="button"
                onClick={addFeature}
                className="add-feature-btn"
              >
                Add
              </button>
            </div>
            <ul className="features-list">
              {roomFeatures.map((feature, index) => (
                <li key={index}>
                  {feature}
                  <button type="button" onClick={() => removeFeature(feature)}>
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <div className="inline-inputs">
              <button type="submit" className="upload-btn full-width-btn">
                Upload
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddVilla;

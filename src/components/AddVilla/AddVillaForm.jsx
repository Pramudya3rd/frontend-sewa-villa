import React, { useState } from "react";

const AddVillaForm = () => {
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
    // Tambahkan request ke backend di sini
  };

  return (
    <div className="add-villa-container">
      <form onSubmit={handleSubmit} className="add-villa-form">
        {/* UPLOAD SECTION */}
        <div className="upload-section">
          <label>UPLOAD IMAGES</label>
          <div className="image-placeholder">
            {previewImage ? (
              <img src={previewImage} alt="Preview" />
            ) : (
              <span>No image selected</span>
            )}
          </div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {/* DETAILS SECTION */}
        <div className="details-section">
          <label>FILL YOUR DETAILS</label>
          <input
            type="text"
            name="villaName"
            placeholder="Villa Name"
            value={formData.villaName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <div className="inline-inputs">
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* FEATURES */}
          <label>ROOM FEATURES</label>
          <div className="inline-inputs">
            <input
              type="text"
              className="feature-input"
              placeholder="Add a feature (e.g., TV, AC)"
              value={newFeature}
              onChange={handleFeatureChange}
            />
            <button
              type="button"
              className="add-feature-btn"
              onClick={addFeature}
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

          <button type="submit" className="upload-btn full-width-btn">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVillaForm;

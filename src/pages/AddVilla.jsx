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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Villa data uploaded!");
    // logicnya disini
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

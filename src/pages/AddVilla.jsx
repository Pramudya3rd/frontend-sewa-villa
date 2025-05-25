import React, { useState } from "react";
import Navbar from "../components/Navbar";
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Villa data uploaded!");
    // Submit logic here
  };

  return (
    <>
      <Navbar />
      <div className="add-villa-container">
        <form onSubmit={handleSubmit} className="add-villa-form">
          <div className="upload-section">
            <label>UPLOAD IMAGES</label>
            <div className="image-placeholder" />
            <input type="file" name="image" onChange={handleChange} />
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
          </div>
        </form>
      </div>

      <div className="upload-btn-wrapper">
        <button type="submit" className="upload-btn" onClick={handleSubmit}>
          Upload
        </button>
      </div>
    </>
  );
};

export default AddVilla;

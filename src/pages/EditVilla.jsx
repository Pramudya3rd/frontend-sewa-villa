import React, { useEffect, useState } from "react";
import NavbarProfile from "../components/NavbarProfile";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/add-villa.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditVilla = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const villaData = location.state;

  const [formData, setFormData] = useState({
    villaName: "",
    address: "",
    description: "",
    capacity: "",
    price: "",
    size: "",
    bedType: "",
    mainImage: null,
    additionalImages: [],
  });

  const [previewMainImage, setPreviewMainImage] = useState(null);
  const [previewAdditionalImages, setPreviewAdditionalImages] = useState([]);
  const [roomFeatures, setRoomFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!villaData) {
      navigate("/villas");
      return;
    }

    setFormData({
      villaName: villaData.title || "",
      address: villaData.location || "",
      description: villaData.description || "",
      capacity: villaData.guests || "",
      price: villaData.price || "",
      size: villaData.area || "",
      bedType: villaData.bedType || "",
      mainImage: null,
      additionalImages: [],
    });

    setPreviewMainImage(villaData.image || null);
    setRoomFeatures(villaData.features || []);
  }, [villaData, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "mainImage" && files.length > 0) {
      const file = files[0];
      setFormData({ ...formData, mainImage: file });
      setPreviewMainImage(URL.createObjectURL(file));
    } else if (name === "additionalImages") {
      const newFiles = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        additionalImages: [...prev.additionalImages, ...newFiles],
      }));
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewAdditionalImages((prev) => [...prev, ...newPreviews]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const uploadImage = async (file) => {
    const formDataImage = new FormData();
    formDataImage.append("image", file);

    const response = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      body: formDataImage,
    });

    // Sementara, frontend dummy: return URL palsu
    return URL.createObjectURL(file); // Dummy image preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let mainImageUrl = previewMainImage;
      const additionalImageUrls = [];

      if (formData.mainImage) {
        mainImageUrl = await uploadImage(formData.mainImage);
      }

      for (const file of formData.additionalImages) {
        const url = await uploadImage(file);
        additionalImageUrls.push(url);
      }

      const updatedData = {
        name: formData.villaName,
        location: formData.address,
        description: formData.description,
        guests: parseInt(formData.capacity),
        price: parseFloat(formData.price),
        mainImage: mainImageUrl,
        images: additionalImageUrls,
        features: roomFeatures,
        area: formData.size,
        beds: parseInt(formData.bedType),
      };

      // Kirim ke backend (nanti aktifkan ketika API siap)
      await fetch(`${BASE_URL}/api/villas/${villaData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      alert("Villa updated successfully!");
      navigate("/owner");
    } catch (err) {
      console.error("Update error:", err);
      alert("Update error: " + err.message);
    } finally {
      setLoading(false);
    }
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

  return (
    <>
      <NavbarProfile />
      <div className="add-villa-container" style={{ marginTop: "20px" }}>
        <form onSubmit={handleSubmit} className="add-villa-form">
          <div className="upload-section">
            <label>EDIT VILLA IMAGES</label>
            <div className="mb-3">
              <label htmlFor="mainImage" className="form-label">
                Main Image
              </label>
              <div className="image-placeholder">
                {previewMainImage ? (
                  <img src={previewMainImage} alt="Main Preview" />
                ) : (
                  <span>No main image selected</span>
                )}
              </div>
              <input
                type="file"
                name="mainImage"
                id="mainImage"
                onChange={handleChange}
                accept="image/*"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="additionalImages" className="form-label">
                Additional Images
              </label>
              <input
                type="file"
                name="additionalImages"
                id="additionalImages"
                onChange={handleChange}
                accept="image/*"
                multiple
                className="form-control"
              />
              <div className="d-flex flex-wrap mt-2 gap-2">
                {previewAdditionalImages.map((preview, index) => (
                  <div
                    key={index}
                    style={{
                      width: "100px",
                      height: "100px",
                      position: "relative",
                    }}
                  >
                    <img
                      src={preview}
                      alt={`Additional ${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="details-section">
            <label>EDIT DETAILS</label>
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
                placeholder="Price per night"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="text"
              name="size"
              placeholder="Size (e.g., 24m²)"
              value={formData.size}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="bedType"
              placeholder="Bed Type"
              value={formData.bedType}
              onChange={handleChange}
              required
            />

            <label>Room Features</label>
            <div className="inline-inputs">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="e.g., AC, TV"
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
              {roomFeatures.map((f, i) => (
                <li key={i}>
                  {f}{" "}
                  <button type="button" onClick={() => removeFeature(f)}>
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="submit"
              className="upload-btn full-width-btn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Villa"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditVilla;

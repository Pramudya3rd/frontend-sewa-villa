import React, { useState, useEffect } from "react";
import EditImages from "./EditImages";
import EditFeatures from "./EditFeatures";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditVillaForm = ({ villaData, onSuccess }) => {
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

  // Cleanup preview URLs untuk mencegah memory leak
  useEffect(() => {
    return () => {
      if (previewMainImage && typeof previewMainImage === "string" && previewMainImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewMainImage);
      }
      previewAdditionalImages.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [previewMainImage, previewAdditionalImages]);

  useEffect(() => {
    if (villaData) {
      setFormData({
        villaName: villaData.title || "",
        address: villaData.location || "",
        description: villaData.description || "",
        capacity: villaData.guests ? villaData.guests.toString() : "",
        price: villaData.price ? villaData.price.toString() : "",
        size: villaData.area || "",
        bedType: villaData.bedType || "",
        mainImage: null,
        additionalImages: [],
      });

      setPreviewMainImage(villaData.image || null);
      setRoomFeatures(villaData.features || []);
      setPreviewAdditionalImages([]); 
    }
  }, [villaData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "mainImage" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, mainImage: file }));
      setPreviewMainImage(URL.createObjectURL(file));
    } else if (name === "additionalImages" && files.length > 0) {
      const newFiles = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        additionalImages: [...prev.additionalImages, ...newFiles],
      }));
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewAdditionalImages((prev) => [...prev, ...newPreviews]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImage = async (file) => {
    const formDataImage = new FormData();
    formDataImage.append("image", file);

    const response = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      body: formDataImage,
    });

    if (!response.ok) throw new Error("Image upload failed");

    const data = await response.json();
    return data.url; 
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
        bedType: formData.bedType,
      };

      //fetch 
      const res = await fetch(`${BASE_URL}/api/villas/${villaData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Update villa failed");

      alert("Villa updated successfully!");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Update error:", err);
      alert("Update error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const addFeature = () => {
    const trimmed = newFeature.trim();
    if (trimmed && !roomFeatures.includes(trimmed)) {
      setRoomFeatures([...roomFeatures, trimmed]);
      setNewFeature("");
    }
  };

  const removeFeature = (feature) => {
    setRoomFeatures(roomFeatures.filter((f) => f !== feature));
  };

  return (
    <form onSubmit={handleSubmit} className="add-villa-form">
      <EditImages
        previewMainImage={previewMainImage}
        previewAdditionalImages={previewAdditionalImages}
        handleChange={handleChange}
      />

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

        <EditFeatures
          roomFeatures={roomFeatures}
          newFeature={newFeature}
          setNewFeature={setNewFeature}
          addFeature={addFeature}
          removeFeature={removeFeature}
        />

        <button type="submit" className="upload-btn full-width-btn" disabled={loading}>
          {loading ? "Updating..." : "Update Villa"}
        </button>
      </div>
    </form>
  );
};

export default EditVillaForm;

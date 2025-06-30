// src/components/VillaCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VillaCard.css";
import { FaStar } from "react-icons/fa";

const backendBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

const VillaCard = ({ id, title, location, price, image, onBookNow }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow();
    } else {
      navigate(`/villa-detail`, {
        state: { id: id, title, location, price, mainImage: image },
      });
    }
  };

  return (
    <div className="col-md-4 d-flex">
      <div className="card villa-card border-0 shadow-sm rounded-4 flex-fill">
        <img
          src={image ? `${backendBaseUrl}${image}` : ""}
          className="card-img-top rounded-top-4 villa-image"
          alt={title}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-semibold">{title}</h5>
          <p className="text-muted mb-2">{location}</p>{" "}
          <p className="mb-1 small text-muted">Start From</p>
          <p className="fw-bold fs-6">
            Rp. {parseFloat(price).toLocaleString("id-ID")} / Night{" "}
          </p>
          <button
            className="btn custom-btn rounded-pill mt-3 w-100"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VillaCard;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const VillaCard = ({ title, location, price, image }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    // Navigasi ke halaman detail, bisa disesuaikan path-nya
    navigate('/villa-detail', { state: { title, location, price, image } });
  };

  return (
    <div className="col-md-4">
      <div className="card villa-card border rounded-4 shadow-sm">
        <img src={image} className="card-img-top rounded-top-4" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="text-muted small">{location}</p>
          <p className="mb-1">
            <span className="text-warning">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            4.9 <span className="text-muted">(20 Review)</span>
          </p>
          <p className="mb-1 small">Start From</p>
          <p className="fw-bold">{price}</p>
          <button className="btn btn-light book-btn" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VillaCard;

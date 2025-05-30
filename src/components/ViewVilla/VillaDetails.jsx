import React from 'react';

const VillaDetails = ({
  title,
  location,
  price,
  description,
  features,
  guests,
  area,
  bedType,
  onEdit
}) => (
  <div className="col-md-6">
    <h3 className="fw-bold">{title}</h3>
    <h6 className="text-muted mb-1">{location}</h6>

    <h5 className="fw-bold text-dark mb-3">
      Rp. {price.toLocaleString('id-ID')}{" "}
      <span className="fw-normal text-muted">/ night</span>
    </h5>

    <p className="text-muted">{description}</p>

    <h6 className="fw-bold mt-4 mb-2">Room Features</h6>
    <ul className="text-muted mb-3">
      {features.map((f, idx) => (
        <li key={idx}>{f}</li>
      ))}
      <li>Max Guests: {guests}</li>
      <li>Size: {area}</li>
      <li>Bed Type: {bedType}</li>
    </ul>

    <button
      className="btn rounded-pill text-white w-100 py-2"
      style={{ backgroundColor: '#5a7684' }}
      onClick={onEdit}
    >
      Edit
    </button>
  </div>
);

export default VillaDetails;


import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarProfile from "../components/NavbarProfile";

const ViewVilla = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    title = "De Santika Nirwana",
    location: loc = "Ubud, Bali",
    price = 5000000,
    image = 'https://i.pinimg.com/736x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg',
    description = "Villa eksklusif dengan fasilitas premium yang dirancang untuk kenyamanan dan privasi tamu, ideal untuk liburan maupun keperluan bisnis. Terletak di lokasi strategis dengan akses mudah ke destinasi wisata dan pusat aktivitas.",
    guests = 6,
    area = "24m²",
    bedType = "One King Bed",
    features = ["TV", "Free Wifi", "Air Conditioner", "Heater", "Private Bathroom"]
  } = location.state || {};

  const roomImages = [
    'https://i.pinimg.com/736x/a8/bc/50/a8bc50298db283746524f3c82bbd9465.jpg',
    'https://i.pinimg.com/736x/79/0b/56/790b56d61da6b4b2bd1301da3385b085.jpg',
    'https://i.pinimg.com/736x/47/96/a1/4796a1d06f323c31fd2c7407c43788b9.jpg'
  ];

  const handleEdit = () => {
    navigate('/edit-villa', {
      state: {
        title,
        location: loc,
        price,
        image,
        description,
        guests,
        area,
        bedType,
        features
      }
    });
  };

  return (
    <>
      <NavbarProfile />

      <div className="container py-5">
        <div className="row g-5">
          {/* Main image and thumbnails */}
          <div className="col-md-6">
            <img src={image} alt={title} className="img-fluid rounded-4 mb-3" />
            <div className="row g-3">
              {roomImages.map((img, i) => (
                <div className="col-4" key={i}>
                  <img
                    src={img}
                    alt={`room-${i}`}
                    className="img-fluid img-thumbnail rounded-4"
                    style={{ height: '80px', objectFit: 'cover', width: '100%' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Villa Detail Info */}
          <div className="col-md-6">
            <h3 className="fw-bold">{title}</h3>
            <h6 className="text-muted mb-1">{loc}</h6>

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
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewVilla;

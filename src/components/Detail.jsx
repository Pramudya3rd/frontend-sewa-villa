import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FaStar, FaTv, FaWifi, FaSnowflake, FaThermometerHalf,
  FaBath, FaUserFriends, FaRulerCombined, FaBed
} from 'react-icons/fa';

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, location: loc, price, image } = location.state || {
    title: "De Santika Nirwana",
    location: "Ubud, Bali",
    price: 5000000,
    image: 'https://i.pinimg.com/736x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg'
  };

  const roomImages = [
    'https://i.pinimg.com/736x/a8/bc/50/a8bc50298db283746524f3c82bbd9465.jpg',
    'https://i.pinimg.com/736x/79/0b/56/790b56d61da6b4b2bd1301da3385b085.jpg',
    'https://i.pinimg.com/736x/47/96/a1/4796a1d06f323c31fd2c7407c43788b9.jpg'
  ];

  const handleBooking = () => {
    navigate('/booking', {
      state: { title, price }
    });
  };

  return (
    <div className="container py-5">
      <div className="row g-5">
        {/* Gambar utama dan thumbnail */}
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

        {/* Informasi Detail Villa */}
        <div className="col-md-6">
          <h3 className="fw-bold">{title}</h3>
          <p className="mb-2">
            <span className="text-warning">
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </span>
            <span className="ms-2">
              4.9 <span className="text-muted">(20 Review)</span>
            </span>
          </p>
          <h5 className="fw-bold text-dark mb-3">
            Rp. {price.toLocaleString('id-ID')} <span className="fw-normal text-muted">/ Night</span>
          </h5>
          <p className="text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </p>

          <h6 className="fw-bold mt-4 mb-2">Room Feature</h6>
          <div className="row row-cols-2 mb-3 text-muted">
            <div className="col mb-2"><FaTv className="me-2" />TV</div>
            <div className="col mb-2"><FaWifi className="me-2" />Free Wifi</div>
            <div className="col mb-2"><FaSnowflake className="me-2" />Air Conditioner</div>
            <div className="col mb-2"><FaThermometerHalf className="me-2" />Heater</div>
            <div className="col mb-2"><FaBath className="me-2" />Bathroom</div>
            <div className="col mb-2"><FaUserFriends className="me-2" />Guest: 6</div>
            <div className="col mb-2"><FaRulerCombined className="me-2" />Size: 24m</div>
            <div className="col mb-2"><FaBed className="me-2" />Bed Type: One bed</div>
          </div>

          <h6 className="fw-bold mt-4 mb-2">Children and extra beds</h6>
          <p className="text-muted mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </p>

          <button 
            className="btn rounded-pill text-white w-100 py-2"
            style={{ backgroundColor: '#5a7684' }}
            onClick={handleBooking}
        >
            Booking
         </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;

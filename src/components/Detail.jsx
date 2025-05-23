import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FaStar, FaTv, FaWifi, FaSnowflake, FaThermometerHalf, 
  FaBath, FaUserFriends, FaRulerCombined, FaBed 
} from 'react-icons/fa';

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, location: loc, price, image } = location.state || {};

  const roomImages = [
    'https://i.pinimg.com/564x/9c/f4/3a/9cf43a30284a9f0de35f38a84056fffb.jpg',
    'https://i.pinimg.com/564x/2b/4a/38/2b4a3864fc2b14352ad68a2fdc8430f5.jpg',
    'https://i.pinimg.com/564x/99/2e/2e/992e2e9c0b9e3123f03ecff109a47c38.jpg'
  ];

  const handleBooking = () => {
    navigate('/payment', {
      state: { title, price }
    });
  };

  return (
    <div className="container py-5">
      <div className="row g-5">
        {/* Left Image */}
        <div className="col-md-6">
          <img src={image} alt={title} className="img-fluid rounded-4 mb-3" />
          <div className="d-flex gap-3">
            {roomImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`room-${i}`}
                className="img-thumbnail rounded-4"
                style={{ width: '100px', height: '80px', objectFit: 'cover' }}
              />
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="col-md-6">
          <h3 className="fw-bold">{title}</h3>
          <p>
            <span className="text-warning"><FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></span>
            <span className="ms-2">4.9 <span className="text-muted">(20 Review)</span></span>
          </p>
          <h5 className="fw-bold text-primary">{price} <span className="fw-normal text-dark">/ Night</span></h5>
          <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>

          <h6 className="fw-bold">Room Feature</h6>
          <div className="row row-cols-2 mb-3">
            <div className="col"><FaTv className="me-2" />TV</div>
            <div className="col"><FaWifi className="me-2" />Free Wifi</div>
            <div className="col"><FaSnowflake className="me-2" />Air Conditioner</div>
            <div className="col"><FaThermometerHalf className="me-2" />Heater</div>
            <div className="col"><FaBath className="me-2" />Bathroom</div>
            <div className="col"><FaUserFriends className="me-2" />Guest: 6</div>
            <div className="col"><FaRulerCombined className="me-2" />Size: 24m</div>
            <div className="col"><FaBed className="me-2" />Bed Type: One bed</div>
          </div>

          <h6 className="fw-bold">Children and extra beds</h6>
          <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>

          <button className="btn btn-dark rounded-pill px-4" onClick={handleBooking}>
            Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;

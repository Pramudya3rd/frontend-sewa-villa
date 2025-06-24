// src/components/PaymentPage.jsx
import React, { useState, useEffect } from "react";
import "../styles/Payment.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaStar,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaSwimmer,
  FaUserFriends,
  FaLayerGroup,
} from "react-icons/fa";
import { BACKEND_URL } from "../api/axios";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingData, setBookingData] = useState(null);
  const [villaDetails, setVillaDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { booking, villa } = location.state || {};
    if (booking && villa) {
      setBookingData(booking);
      setVillaDetails(villa);
      setLoading(false);
    } else {
      setError(
        "Data pemesanan tidak ditemukan. Silakan kembali ke halaman booking."
      );
      setLoading(false);
    }
  }, [location.state, navigate]);

  const handlePayment = () => {
    navigate("/confirmation", {
      state: { booking: bookingData, villa: villaDetails },
    });
  };

  if (loading) {
    return (
      <div className="text-center my-5">Memuat ringkasan pembayaran...</div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }

  if (!bookingData || !villaDetails) {
    return (
      <div className="text-center my-5">
        Ringkasan pembayaran tidak tersedia.
      </div>
    );
  }

  const {
    checkInDate,
    checkOutDate,
    totalPrice,
    user: bookingUser,
  } = bookingData;

  const {
    name: villaName,
    location: villaLocation,
    pricePerNight,
    mainImage,
    features,
    bedType,
    size,
    guestCapacity,
  } = villaDetails;

  const formattedCheckIn = new Date(checkInDate).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedCheckOut = new Date(checkOutDate).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTotalPrice = parseFloat(totalPrice).toLocaleString("id-ID");
  const formattedPricePerNight =
    parseFloat(pricePerNight).toLocaleString("id-ID");

  const currentUser = bookingUser || JSON.parse(localStorage.getItem("user"));
  const firstName = currentUser?.name?.split(" ")[0] || "";
  const lastName = currentUser?.name?.split(" ").slice(1).join(" ") || "";
  const email = currentUser?.email || "";
  const phone = currentUser?.phone || "";

  return (
    <div className="villa-booking-container">
      <div className="villa-card">
        <img
          src={`${BACKEND_URL}${mainImage}`}
          alt={villaName}
          className="villa-image"
        />
        <div className="villa-content">
          <p className="villa-tagline">THE CHOICE OF FAMILIES</p>
          <h5 className="villa-title">{villaName}</h5>
          <div className="villa-rating">
            <span className="text-warning">
              <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
            </span>
            <span className="rating-text">4.9 (20 Review)</span>
          </div>
          <hr />
          <div className="villa-features">
            {features?.map((feature, index) => (
              <div key={index}>{feature}</div>
            ))}
            <div>
              <FaBed /> Beds <strong>{bedType || "N/A"}</strong>
            </div>
            <div>
              <FaRulerCombined /> Area <strong>{size || "N/A"}</strong>
            </div>
            <div>
              <FaUserFriends /> Guest <strong>{guestCapacity}</strong>
            </div>
          </div>
          <p className="mt-3 text-muted">
            Price: Rp. {formattedPricePerNight} / Night
          </p>
        </div>
      </div>

      <div className="reservation-summary">
        <h5 className="form-title">RESERVATION SUMMARY</h5>

        <div className="summary-rows">
          <div className="summary-row">
            <span>First Name</span>
            <span>
              <strong>{firstName}</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Last Name</span>
            <span>
              <strong>{lastName}</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Email Address</span>
            <span>
              <strong>{email}</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Phone Number</span>
            <span>
              <strong>{phone}</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Check-In</span>
            <span>
              <strong>{formattedCheckIn}</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Check-Out</span>
            <span>
              <strong>{formattedCheckOut}</strong>
            </span>
          </div>
          <hr />
          <div className="summary-row">
            <span>Total Price</span>
            <span>
              <strong>Rp. {formattedTotalPrice}</strong>
            </span>
          </div>
        </div>

        <div className="upload-section">
          <p>
            <strong>CONTACT VILLA</strong>
          </p>
          <div className="contact-card">
            <a
              href={`https://wa.me/${villaDetails.owner?.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>{villaDetails.owner?.phone || "+62 ..."}</strong>
            </a>
          </div>
        </div>

        <button className="PaymentPage-button" onClick={handlePayment}>
          Proceed to Confirmation
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

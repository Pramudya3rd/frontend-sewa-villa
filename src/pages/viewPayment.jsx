import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import api from "../api/axios";
import "../styles/view-payment.css";

const ViewPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingId = location.state?.bookingId;

  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendBaseUrl =
    import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ||
    "http://localhost:5000";

  useEffect(() => {
    if (!bookingId) {
      setError("ID Booking tidak ditemukan.");
      setLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        const response = await api.get(`/bookings/${bookingId}`);
        setBookingData(response.data.data);
      } catch (err) {
        console.error("Gagal mengambil data booking:", err);
        setError("Gagal mengambil data booking.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleBack = () => navigate(-1);

  if (loading)
    return <div className="text-center my-5">Memuat data pembayaran...</div>;
  if (error)
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  if (!bookingData)
    return <div className="text-center my-5">Data tidak tersedia.</div>;

  const {
    user,
    villa,
    checkInDate,
    checkOutDate,
    totalPrice,
    paymentProof,
    status,
  } = bookingData;

  return (
    <div className="view-payment-page">
      {/* HEADER ATAS */}
      <header className="view-payment-header">
        <div className="left-section">
          <button className="back-button" onClick={handleBack}>
            <LuArrowLeft size={20} />
          </button>
        </div>
        <div className="center-section">
          <div className="role">PAYMENT DETAILS</div>
        </div>
      </header>

      {/* KONTEN */}
      <div className="invoice-container">
        <div className="invoice-box">
          {/* Detail Pembayaran */}
          <div className="reservation-details">
            <div className="reservation-row">
              <span className="label">Nama</span>
              <span className="value">
                <strong>{user?.name}</strong>
              </span>
            </div>
            <div className="reservation-row">
              <span className="label">Email</span>
              <span className="value">
                <strong>{user?.email}</strong>
              </span>
            </div>
            <div className="reservation-row">
              <span className="label">Villa</span>
              <span className="value">
                <strong>{villa?.name}</strong>
              </span>
            </div>
            <div className="reservation-row">
              <span className="label">Check-in</span>
              <span className="value">
                <strong>
                  {new Date(checkInDate).toLocaleDateString("id-ID")}
                </strong>
              </span>
            </div>
            <div className="reservation-row">
              <span className="label">Check-out</span>
              <span className="value">
                <strong>
                  {new Date(checkOutDate).toLocaleDateString("id-ID")}
                </strong>
              </span>
            </div>
            <div className="reservation-row">
              <span className="label">Total</span>
              <span className="value">
                <strong>
                  Rp. {parseFloat(totalPrice).toLocaleString("id-ID")}
                </strong>
              </span>
            </div>
            <div className="reservation-row">
              <span className="label">Status</span>
              <span className="value">
                <strong>{status}</strong>
              </span>
            </div>
          </div>

          {/* Bukti Pembayaran */}
          {paymentProof && (
            <div className="mt-4">
              <h6 className="fw-bold mb-2">Bukti Pembayaran:</h6>
              <img
                src={`${backendBaseUrl}${paymentProof}`}
                alt="Bukti Pembayaran"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPayment;

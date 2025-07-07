import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import SidebarOwner from "../components/SidebarOwner";
import MyVillaTable from "../components/MyVilla/MyVillaTable";
import "../styles/owner.css";
import api from "../api/axios";

const Owner = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [errorBookings, setErrorBookings] = useState(null);

  const handleAddVilla = () => {
    navigate("/add-villa");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchOwnerBookings = async () => {
    setLoadingBookings(true);
    setErrorBookings(null);
    try {
      const response = await api.get("/bookings");
      setBookings(response.data.data);
    } catch (err) {
      setErrorBookings("Gagal memuat daftar pemesanan Anda.");
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    if (activeMenu === "booking") {
      fetchOwnerBookings();
    }
  }, [activeMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status: newStatus });
      alert(`Status booking berhasil diubah menjadi ${newStatus}.`);
      fetchOwnerBookings();
    } catch (err) {
      alert("Gagal mengubah status booking.");
    }
  };

  return (
    <div className="owner-page">
      <SidebarOwner setActiveMenu={setActiveMenu} />
      <div className="main-content">
        <div
          className="header d-flex justify-content-end align-items-center position-relative"
          ref={profileRef}
        >
          <FaUserCircle
            size={32}
            className="text-dark cursor-pointer"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            title="Profile"
          />
          {showProfileMenu && (
            <div className="dropdown-menu show position-absolute end-0 mt-0 shadow bg-white rounded py-2">
              <button
                className="dropdown-item px-4 py-1 text-start"
                onClick={handleLogout}
                style={{ color: "inherit", fontWeight: "normal" }}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {activeMenu === "dashboard" && (
          <div className="welcome-message">
            <h2>Welcome, Owner</h2>
          </div>
        )}

        {activeMenu === "villa" && (
          <div className="villa-section">
            <button className="add-villa-btn" onClick={handleAddVilla}>
              Add Villa
            </button>
            <MyVillaTable />
          </div>
        )}

        {activeMenu === "booking" && (
          <div className="booking-section">
            <h3>Booking List</h3>
            {loadingBookings ? (
              <div className="text-center">Memuat daftar booking...</div>
            ) : errorBookings ? (
              <div className="alert alert-danger text-center">
                {errorBookings}
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center">Tidak ada booking.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Nama Pengguna</th>
                    <th>Email Pengguna</th>
                    <th>Villa</th>
                    <th>Check-in</th>
                    <th>Check-Out</th>
                    <th>Harga Total</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.user?.name || "N/A"}</td>
                      <td>{booking.user?.email || "N/A"}</td>
                      <td>{booking.villa?.name || "N/A"}</td>
                      <td>
                        {new Date(booking.checkInDate).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(booking.checkOutDate).toLocaleDateString()}
                      </td>
                      <td>
                        Rp.{" "}
                        {parseFloat(booking.totalPrice).toLocaleString("id-ID")}
                      </td>
                      <td>{booking.status}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-secondary me-2"
                          onClick={() =>
                            navigate("/view-payment", {
                              state: { bookingId: booking.id },
                            })
                          }
                        >
                          Lihat Pembayaran
                        </button>

                        {booking.status === "pending" && (
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() =>
                              handleUpdateBookingStatus(
                                booking.id,
                                "confirmed"
                              )
                            }
                          >
                            Konfirmasi
                          </button>
                        )}

                        {booking.status !== "cancelled" && (
                          <button
                            className="btn btn-sm btn-danger me-2"
                            onClick={() =>
                              handleUpdateBookingStatus(
                                booking.id,
                                "cancelled"
                              )
                            }
                          >
                            Batal
                          </button>
                        )}

                        {booking.status === "confirmed" && (
                          <button
                            className="btn btn-sm btn-info"
                            onClick={() =>
                              handleUpdateBookingStatus(
                                booking.id,
                                "completed"
                              )
                            }
                          >
                            Selesai
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Owner;

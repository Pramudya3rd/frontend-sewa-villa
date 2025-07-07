import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SidebarAdmin";
import VillaCard from "../components/VillaCard";
import "../styles/SideBar.css";
import "../styles/admin.css";
import api from "../api/axios";
import { FaRegEye, FaUserCircle } from "react-icons/fa";

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [owners, setOwners] = useState([]);
  const [villasToUpdate, setVillasToUpdate] = useState([]);
  const [allVillas, setAllVillas] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchData = async (endpoint, setter, filterFn = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(endpoint);
      setter(filterFn ? response.data.data.filter(filterFn) : response.data.data);
    } catch (err) {
      console.error(`Error fetching data from ${endpoint}:`, err);
      setError(`Gagal memuat data dari ${endpoint}.`);
      setter([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeMenu === "user") {
      fetchData("/users", setUsers, (user) => user.role === "user");
    } else if (activeMenu === "owner") {
      Promise.all([
        api.get("/users").then((res) => res.data.data.filter((user) => user.role === "owner")),
        api.get("/villas").then((res) => res.data.data),
      ])
        .then(([ownerData, villaData]) => {
          setOwners(ownerData);
          setAllVillas(villaData);
        })
        .catch((err) => {
          console.error("Error fetching owner or villa data:", err);
          setError("Gagal memuat data owner atau villa.");
          setOwners([]);
          setAllVillas([]);
        })
        .finally(() => setLoading(false));
    } else if (activeMenu === "updateVilla") {
      fetchData("/villas", setVillasToUpdate, (villa) => villa.status !== "verified");
    } else if (activeMenu === "villaList") {
      fetchData("/villas", setAllVillas);
    } else if (activeMenu === "booking") {
      fetchData("/bookings", setBookings);
    } else {
      setLoading(false);
    }
  }, [activeMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpdateVillaStatus = async (villaId, newStatus) => {
    try {
      await api.put(`/villas/${villaId}/status`, { status: newStatus });
      alert(`Status villa berhasil diubah menjadi ${newStatus}.`);
      fetchData("/villas", setVillasToUpdate, (villa) => villa.status !== "verified");
      fetchData("/villas", setAllVillas);
    } catch (err) {
      console.error("Error updating villa status:", err.response?.data || err.message);
      alert(`Gagal mengubah status villa: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status: newStatus });
      alert(`Status booking berhasil diubah menjadi ${newStatus}.`);
      fetchData("/bookings", setBookings);
    } catch (err) {
      console.error("Error updating booking status:", err.response?.data || err.message);
      alert(`Gagal mengubah status booking: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleViewVilla = (villaId) => {
    navigate(`/view-villa`, { state: { id: villaId } });
  };

  return (
    <div className="admin-wrapper">
      <Sidebar setActiveMenu={setActiveMenu} />

      <div className="content-area">
        {activeMenu === "dashboard" && (
          <div className="header d-flex justify-content-between align-items-center mb-3" ref={profileRef}>
            <h2 className="m-0">Welcome, Admin</h2>
            <div className="position-relative">
              <FaUserCircle
                size={30}
                className="text-dark cursor-pointer"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                title="Profile"
              />
              {showProfileMenu && (
                <div className="dropdown-menu show position-absolute end-0 mt-2 shadow bg-white rounded py-2">
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
          </div>
        )}

        {/* MENU USER */}
        {activeMenu === "user" && (
          <div className="user-table">
            <h4>USER</h4>
            {loading ? (
              <div className="text-center">Memuat daftar user...</div>
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div>
            ) : users.length === 0 ? (
              <div className="text-center">Tidak ada user terdaftar.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* MENU OWNER */}
        {activeMenu === "owner" && (
          <div className="user-table">
            <h4>OWNER VILLA</h4>
            {loading ? (
              <div className="text-center">Memuat daftar owner...</div>
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div>
            ) : owners.length === 0 ? (
              <div className="text-center">Tidak ada owner terdaftar.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Villa Name(s)</th>
                  </tr>
                </thead>
                <tbody>
                  {owners.map((owner) => (
                    <tr key={owner.id}>
                      <td>{owner.name}</td>
                      <td>{owner.email}</td>
                      <td>{owner.phone}</td>
                      <td>
                        {allVillas
                          .filter((villa) => villa.ownerId === owner.id)
                          .map((villa) => villa.name)
                          .join(", ") || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* UPDATE VILLA */}
        {activeMenu === "updateVilla" && (
          <div className="user-table">
            <h4>UPDATE VILLA</h4>
            {loading ? (
              <div className="text-center">Memuat villa untuk diupdate...</div>
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div>
            ) : villasToUpdate.length === 0 ? (
              <div className="text-center">Tidak ada villa yang menunggu verifikasi.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Villa Name</th>
                    <th>Address</th>
                    <th>Owner</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {villasToUpdate.map((villa) => (
                    <tr key={villa.id}>
                      <td>{villa.name}</td>
                      <td>{villa.location}</td>
                      <td>{villa.owner?.name || "N/A"}</td>
                      <td>{villa.status}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-info me-2"
                          onClick={() => handleViewVilla(villa.id)}
                          title="View Villa Details"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "#555",
                            fontSize: "18px",
                            padding: "6px 8px",
                            cursor: "pointer",
                            transition: "color 0.3s ease",
                          }}
                        >
                          <FaRegEye />
                        </button>
                        <button className="btn-approve" onClick={() => handleUpdateVillaStatus(villa.id, "verified")}>
                          Approve
                        </button>
                        <button className="btn-reject" onClick={() => handleUpdateVillaStatus(villa.id, "rejected")}>
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* VILLA LIST */}
        {activeMenu === "villaList" && (
          <div className="villa-list-section">
            <h4>LIST VILLA</h4>
            {loading ? (
              <div className="text-center">Memuat daftar villa...</div>
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div>
            ) : allVillas.length === 0 ? (
              <div className="text-center">Tidak ada villa terdaftar.</div>
            ) : (
              <div className="row g-4 justify-content-center">
                {allVillas.map((villa) => (
                  <VillaCard
                    key={villa.id}
                    id={villa.id}
                    title={villa.name}
                    location={villa.location}
                    price={villa.pricePerNight}
                    image={villa.mainImage}
                    onBookNow={() => navigate("/villa-detail", { state: { id: villa.id } })}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* BOOKING */}
        {activeMenu === "booking" && (
          <div className="user-table">
            <h4>LIST BOOKING</h4>
            {loading ? (
              <div className="text-center">Memuat daftar booking...</div>
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div>
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
                      <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                      <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                      <td>
                        Rp. {parseFloat(booking.totalPrice).toLocaleString("id-ID")}
                      </td>
                      <td>{booking.status}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-secondary me-2"
                          onClick={() => navigate("/view-payment", { state: { bookingId: booking.id } })}
                        >
                          Lihat Pembayaran
                        </button>

                        {booking.status === "pending" && (
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => handleUpdateBookingStatus(booking.id, "confirmed")}
                          >
                            Konfirmasi
                          </button>
                        )}
                        {booking.status !== "cancelled" && (
                          <button
                            className="btn btn-sm btn-danger me-2"
                            onClick={() => handleUpdateBookingStatus(booking.id, "cancelled")}
                          >
                            Batal
                          </button>
                        )}
                        {booking.status === "confirmed" && (
                          <button
                            className="btn btn-sm btn-info"
                            onClick={() => handleUpdateBookingStatus(booking.id, "completed")}
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

export default Admin;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarProfile";
import "../styles/owner.css";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

const villaList = [
  {
    name: "Grand Barca Nirwana",
    address: "Yogyakarta",
    status: "Approved",
    price: 2000000,
    image: "https://i.pinimg.com/736x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg",
    description: "Villa eksklusif dengan fasilitas premium yang dirancang untuk kenyamanan dan privasi tamu, ideal untuk liburan maupun keperluan bisnis. Terletak di lokasi strategis dengan akses mudah ke destinasi wisata dan pusat aktivitas.",
    guests: 4,
    area: "30m²",
    bedType: "Double Bed",
    features: ["TV", "Free Wifi", "Air Conditioner"],
  },
  {
    name: "Tropical Villa",
    address: "Bali",
    status: "Pending",
    price: 3500000,
    image: "https://i.pinimg.com/736x/a8/bc/50/a8bc50298db283746524f3c82bbd9465.jpg",
    description: "Villa eksklusif dengan fasilitas premium yang dirancang untuk kenyamanan dan privasi tamu, ideal untuk liburan maupun keperluan bisnis. Terletak di lokasi strategis dengan akses mudah ke destinasi wisata dan pusat aktivitas.",
    guests: 6,
    area: "50m²",
    bedType: "King Bed",
    features: ["TV", "Heater", "Private Bathroom"],
  },
];

const OwnerDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("manage");
  const navigate = useNavigate();

  const handleAddVilla = () => {
    navigate("/add-villa");
  };

  const handleViewVilla = (villa) => {
    navigate("/view-villa", { state: { 
      title: villa.name,
      location: villa.address,
      price: villa.price,
      image: villa.image,
      description: villa.description,
      guests: villa.guests,
      area: villa.area,
      bedType: villa.bedType,
      features: villa.features
    }});
  };

  const handleEditVilla = (villa) => {
    navigate("/edit-villa", { state: {
      title: villa.name,
      location: villa.address,
      price: villa.price,
      image: villa.image,
      description: villa.description,
      guests: villa.guests,
      area: villa.area,
      bedType: villa.bedType,
      features: villa.features
    }});
  };

  return (
    <div className="owner-dashboard">
      <Navbar role="owner" />
      <div className="owner-container">
        <aside className="owner-sidebar">
          <ul>
            <li
              className={activeMenu === "manage" ? "active" : ""}
              onClick={() => setActiveMenu("manage")}
            >
              MANAGE
            </li>
            <li
              className={activeMenu === "profile" ? "active" : ""}
              onClick={() => setActiveMenu("profile")}
            >
              PROFIL
            </li>
          </ul>
        </aside>

        <main className="owner-content">
          {activeMenu === "manage" && (
            <>
              <button className="add-villa-btn" onClick={handleAddVilla}>
                Add Villa
              </button>

              <div className="villa-table">
                <table>
                  <thead>
                    <tr>
                      <th>Villa Name</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {villaList.map((villa, index) => (
                      <tr key={index}>
                        <td>{villa.name}</td>
                        <td>{villa.address}</td>
                        <td>{villa.status}</td>
                        <td className="action-icons">
                          <FiEye title="View" onClick={() => handleViewVilla(villa)} />
                          <FiEdit title="Edit" onClick={() => handleEditVilla(villa)} />
                          <FiTrash2 title="Delete" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeMenu === "profile" && (
            <div className="profile-section">
              <h2>Owner Profile</h2>
              <p>Isi detail profil di sini</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboard;

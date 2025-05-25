import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Tambahkan ini
import Navbar from "../components/NavbarProfile";
import "../styles/owner.css";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

const villaList = [
  {
    name: "Grand Barca Nirwana",
    address: "Yogyakarta",
    status: "Approved",
  },
  {
    name: "Grand Barca Nirwana",
    address: "Yogyakarta",
    status: "Pending",
  },
  {
    name: "Grand Barca Nirwana",
    address: "Yogyakarta",
    status: "Rejected",
  },
];

const OwnerDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("manage");
  const navigate = useNavigate(); // ✅

  const handleAddVilla = () => {
    navigate("/add-villa");
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
                          <FiEye title="View" />
                          <FiEdit title="Edit" />
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

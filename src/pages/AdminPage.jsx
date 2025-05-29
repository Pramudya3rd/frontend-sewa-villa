import React, { useState } from "react";
import Navbar from "../components/NavbarProfile";
import "../styles/admin.css";

const data = [
  {
    villaName: "Grand Barca Nirwana",
    address: "Yogyakarta",
    owner: "Arya Manurung",
  },
  {
    villaName: "Grand Barca Nirwana",
    address: "Yogyakarta",
    owner: "Arya Manurung",
  },
  {
    villaName: "Grand Barca Nirwana",
    address: "Yogyakarta",
    owner: "Arya Manurung",
  },
];

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("manage");

  const handleApprove = (villaName) => {
    alert(`Villa "${villaName}" berhasil diapprove!`);
  };

  const handleReject = (villaName) => {
    alert(`Villa "${villaName}" ditolak.`);
  };


  return (
    <div>
      <Navbar />
      <div className="admin-container">
        <div className="admin-sidebar">
          <ul>
            <li
              className={activeMenu === "manage" ? "active" : ""}
              onClick={() => setActiveMenu("manage")}
              style={{ cursor: "pointer" }}
            >
              MANAGE
            </li>
            <li
              className={activeMenu === "profile" ? "active" : ""}
              onClick={() => setActiveMenu("profile")}
              style={{ cursor: "pointer" }}
            >
              PROFIL
            </li>
          </ul>
        </div>
        <div className="admin-content">
          {activeMenu === "manage" && (
            <div className="villa-table">
              <table>
                <thead>
                  <tr>
                    <th>Villa Name</th>
                    <th>Address</th>
                    <th>Owner</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((villa, index) => (
                    <tr key={index}>
                      <td>{villa.villaName}</td>
                      <td>{villa.address}</td>
                      <td>{villa.owner}</td>
                      <td>
                        <button
                          className="btn-approve"
                          onClick={() => handleApprove(villa.villaName)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn-reject"
                          onClick={() => handleReject(villa.villaName)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeMenu === "profile" && (
            <div>
              <h2>Profile Section</h2>
              <p>Ini konten profil admin??</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

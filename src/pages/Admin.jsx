import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import "../styles/SideBar.css";

const dummyUsers = [
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    address: "Jl Bandung, Jawa Barat",
  },
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    address: "Jl Bandung, Jawa Barat",
  },
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    address: "Jl Bandung, Jawa Barat",
  },
];

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState("user");

  return (
    <div className="admin-wrapper">
      <Sidebar setActiveMenu={setActiveMenu} />

      <div className="content-area">
        <div className="header">
          <span>ADMIN</span>
          <span role="img" aria-label="profile">👤</span>
        </div>

        {activeMenu === "user" && (
          <div className="user-table">
            <h4>USER</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {dummyUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

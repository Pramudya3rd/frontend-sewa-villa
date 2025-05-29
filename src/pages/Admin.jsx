import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import ListVilla from "../components/ListVilla";
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

const dummyOwners = [
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    villa: "The Sun Rise",
  },
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    villa: "Jasmine The Ae",
  },
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    villa: "Lime on Tea",
  },
];

const dummyVillas = [
  {
    name: "Grand Barca Nirwana",
    address: "Yogyakarta",
    owner: "Arya Manurung",
  },
  {
    name: "Grand Barca Nirwana",
    address: "Yogyakarta",
    owner: "Arya Manurung",
  },
  {
    name: "Grand Barca Nirwana",
    address: "Yogyakarta",
    owner: "Arya Manurung",
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

        {activeMenu === "owner" && (
          <div className="user-table">
            <h4>OWNER</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Villa</th>
                </tr>
              </thead>
              <tbody>
                {dummyOwners.map((owner, index) => (
                  <tr key={index}>
                    <td>{owner.name}</td>
                    <td>{owner.email}</td>
                    <td>{owner.phone}</td>
                    <td>{owner.villa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeMenu === "updateVilla" && (
          <div className="user-table">
            <h4>UPDATE VILLA</h4>
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
                {dummyVillas.map((villa, index) => (
                  <tr key={index}>
                    <td>{villa.name}</td>
                    <td>{villa.address}</td>
                    <td>{villa.owner}</td>
                    <td>
                      <button
                        className="btn-approve"
                        onClick={() => handleApprove(villa.name)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => handleReject(villa.name)}
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

      </div>
    </div>
  );
};

export default Admin;

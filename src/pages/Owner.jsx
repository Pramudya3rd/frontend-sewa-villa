import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarOwner from "../components/SidebarOwner";
import MyVillaTable from "../components/MyVilla/MyVillaTable";
import "../styles/owner.css";

const Owner = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("villa");

  const handleAddVilla = () => {
    navigate("/add-villa");
  };

  return (
    <div className="owner-page">
      <SidebarOwner setActiveMenu={setActiveMenu} />
      <div className="main-content">
        <div className="header">
          <div className="owner-name">OWNER</div>
          <div className="profile-icon">👤</div>
        </div>

        {activeMenu === "villa" && (
          <div className="villa-section">
            <button className="add-villa-btn" onClick={handleAddVilla}>
              Add Villa
            </button>
            <MyVillaTable />
          </div>
        )}

        {/* {activeMenu === "booking" && (
          <div className="villa-section">
            <h3>Booking List</h3>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Owner;

import React, { useState, useEffect } from "react";
import NavbarProfile from "../components/NavbarProfile";
import ProfileCard from "../components/ProfileCard";
import ActivityCard from "../components/ActivityCard";
import api from "../api/axios";
import avatarImg from "../assets/profile.jpg";
import "../styles/profile.css";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const userNameParts = parsedUser.name.split(" ");
          const firstName = userNameParts[0] || "";
          const lastName = userNameParts.slice(1).join(" ") || "";

          setUserProfile({
            avatar: avatarImg,
            name: parsedUser.name,
            email: parsedUser.email,
            phone: parsedUser.phone,
            firstName: firstName,
            lastName: lastName,
          });
        } else {
          setError("Data pengguna tidak ditemukan. Silakan login kembali.");
          setLoading(false);
          return;
        }

        const bookingsResponse = await api.get("/bookings");
        const fetchedBookings = bookingsResponse.data.data;

        const formattedActivities = fetchedBookings.map((booking) => {
          const checkInDate = new Date(booking.checkInDate);
          const monthNames = [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ];
          const date = checkInDate.getDate().toString();
          const month = monthNames[checkInDate.getMonth()];
          const villaName = booking.villa?.name || "Nama Villa Tidak Diketahui";
          const displayStatus = booking.status.toUpperCase();
          const price = `Rp ${parseFloat(booking.totalPrice).toLocaleString(
            "id-ID"
          )}`;
          return {
            id: booking.id,
            date,
            month,
            villaName,
            status: displayStatus,
            price,
          };
        });
        setActivities(formattedActivities);
        setLoading(false);
      } catch (err) {
        setError("Gagal memuat data profil atau aktivitas.");
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-page-container">
      <NavbarProfile />
      <div className="profile-content">
        <ProfileCard user={userProfile} />
        <ActivityCard activities={activities} />
      </div>
    </div>
  );
};

export default ProfilePage;

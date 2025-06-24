import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ViewVillaHeader from "../components/ViewVilla/ViewHeader";
import VillaImages from "../components/ViewVilla/VillaImages";
import VillaDetails from "../components/ViewVilla/VillaDetails";
import "../styles/view-villa.css";
import api from "../api/axios";

const ViewVilla = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [villa, setVilla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const villaId = location.state?.id;

  useEffect(() => {
    if (!villaId) {
      setError("ID Villa tidak ditemukan. Mengarahkan kembali...");
      setLoading(false);
      setTimeout(() => navigate(-1), 2000);
      return;
    }

    const fetchVillaDetails = async () => {
      try {
        const response = await api.get(`/villas/${villaId}`);
        setVilla(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Gagal memuat detail villa.");
        setTimeout(() => navigate(-1), 3000);
      } finally {
        setLoading(false);
      }
    };
    fetchVillaDetails();
  }, [villaId, navigate]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Memuat...</span>
        </div>
        <p className="ms-3">Memuat detail villa...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        {error}
      </div>
    );
  }

  if (!villa) {
    return <div className="text-center my-5">Detail villa tidak tersedia.</div>;
  }

  const handleEdit = () => {
    navigate("/edit-villa", { state: { id: villa.id } });
  };

  const {
    name,
    location: villaLocation,
    pricePerNight,
    mainImage,
    description,
    features,
    guestCapacity,
    size,
    bedType,
  } = villa;

  // Fungsi untuk mengubah string JSON (jika ada) menjadi array
  const parseJsonString = (jsonString) => {
    if (typeof jsonString === "string") {
      try {
        return JSON.parse(jsonString);
      } catch (e) {
        return [];
      }
    }
    return Array.isArray(jsonString) ? jsonString : [];
  };

  const parsedFeatures = parseJsonString(features);

  return (
    <>
      <ViewVillaHeader />
      <div className="container py-5">
        <div className="row g-5">
          <VillaImages
            // Menggunakan URL `mainImage` langsung dari API
            mainImage={mainImage || ""}
            title={name}
            // Array untuk gambar tambahan dikosongkan
            roomImages={[]}
          />
          <VillaDetails
            title={name}
            location={villaLocation}
            price={pricePerNight}
            description={description}
            features={parsedFeatures}
            guestCapacity={guestCapacity}
            size={size}
            bedType={bedType}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </>
  );
};

export default ViewVilla;

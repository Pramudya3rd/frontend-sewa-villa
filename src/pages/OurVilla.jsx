import React, { useState, useEffect } from "react";
import NavbarProfile from "../components/NavbarProfile";
import FilterBar from "../components/FilterBar";
import ListVilla from "../components/ListVilla";
import api from "../api/axios";

export default function OurVilla() {
  const [villas, setVillas] = useState([]);
  const [filteredVillas, setFilteredVillas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const response = await api.get("/villas");
        setVillas(response.data.data);
        setFilteredVillas(response.data.data);
      } catch (err) {
        console.error("Error fetching villas:", err);
        setError("Gagal memuat daftar villa.");
      } finally {
        setLoading(false);
      }
    };
    fetchVillas();
  }, []);

  const handleFilterChange = (filters) => {
    let tempVillas = [...villas];

    // Filter berdasarkan nama villa (search)
    if (filters.search) {
      tempVillas = tempVillas.filter((villa) =>
        villa.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filter berdasarkan lokasi
    if (filters.location) {
      tempVillas = tempVillas.filter(
        (villa) => villa.location === filters.location
      );
    }

    // Urutkan berdasarkan harga
    if (filters.price) {
      tempVillas.sort((a, b) => {
        if (filters.price === "Lowest to Highest") {
          return a.pricePerNight - b.pricePerNight;
        } else {
          return b.pricePerNight - a.pricePerNight;
        }
      });
    }

    setFilteredVillas(tempVillas);
  };

  if (loading) {
    return (
      <>
        <NavbarProfile />
        <div className="text-center my-5">Memuat villa...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavbarProfile />
        <div className="alert alert-danger text-center my-5">{error}</div>
      </>
    );
  }

  return (
    <>
      <NavbarProfile />
      <FilterBar villas={villas} onFilterChange={handleFilterChange} />
      <ListVilla villas={filteredVillas} />
    </>
  );
}

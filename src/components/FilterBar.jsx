import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const FilterBar = ({ villas, onFilterChange }) => {
  const [locations, setLocations] = useState([]);
  const [filters, setFilters] = useState({
    search: "", // State baru untuk pencarian
    location: "",
    price: "",
  });

  useEffect(() => {
    if (villas.length > 0) {
      const uniqueLocations = [
        ...new Set(villas.map((villa) => villa.location)),
      ];
      setLocations(uniqueLocations);
    }
  }, [villas]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center mt-4 mb-1">
      {/* Search Input */}
      <div
        className="input-group rounded-pill border px-3"
        style={{ maxWidth: "250px" }}
      >
        <input
          type="text"
          name="search" // Tambahkan name
          className="form-control border-0"
          placeholder="Search Villa Name"
          style={{ borderRadius: "30px" }}
          value={filters.search}
          onChange={handleInputChange} // Gunakan handler yang sama
        />
        <span className="input-group-text bg-white border-0">
          <FaSearch />
        </span>
      </div>

      {/* Location Filter */}
      <select
        name="location"
        className="form-select rounded-pill border px-3"
        style={{ maxWidth: "150px" }}
        onChange={handleInputChange}
        value={filters.location}
      >
        <option value="">All Locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      {/* Price Filter */}
      <select
        name="price"
        className="form-select rounded-pill border px-3"
        style={{ maxWidth: "150px" }}
        onChange={handleInputChange}
        value={filters.price}
      >
        <option value="">Price</option>
        <option>Lowest to Highest</option>
        <option>Highest to Lowest</option>
      </select>
    </div>
  );
};

export default FilterBar;

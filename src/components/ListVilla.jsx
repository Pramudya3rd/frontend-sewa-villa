import React from "react";
import VillaCard from "./VillaCard";
import "../styles/VillaCard.css";

const ListVilla = ({ villas }) => {
  // Menerima villas sebagai props
  if (villas.length === 0) {
    return (
      <div className="text-center my-5">
        Tidak ada villa yang tersedia sesuai filter.
      </div>
    );
  }

  return (
    <section className="container pb-5">
      <h2 className="section-title">Our Villa</h2>
      <p className="section-subtitle">Happy Holiday, Enjoy Your Staycation</p>
      <div className="row g-4 justify-content-center">
        {villas.map((villa) => (
          <VillaCard
            key={villa.id}
            id={villa.id}
            title={villa.name}
            location={villa.location}
            price={villa.pricePerNight}
            image={villa.mainImage}
          />
        ))}
      </div>
    </section>
  );
};

export default ListVilla;

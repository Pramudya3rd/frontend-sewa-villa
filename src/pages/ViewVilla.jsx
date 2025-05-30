import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ViewVillaHeader from "../components/ViewVilla/ViewHeader";
import VillaImages from "../components/ViewVilla/VillaImages";
import VillaDetails from "../components/ViewVilla/VillaDetails";
import "../styles/view-villa.css";

const ViewVilla = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    title = "De Santika Nirwana",
    location: loc = "Ubud, Bali",
    price = 5000000,
    image = 'https://i.pinimg.com/736x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg',
    description = "Villa eksklusif dengan fasilitas premium...",
    guests = 6,
    area = "24m²",
    bedType = "One King Bed",
    features = ["TV", "Free Wifi", "Air Conditioner", "Heater", "Private Bathroom"]
  } = location.state || {};

  const roomImages = [
    'https://i.pinimg.com/736x/a8/bc/50/a8bc50298db283746524f3c82bbd9465.jpg',
    'https://i.pinimg.com/736x/79/0b/56/790b56d61da6b4b2bd1301da3385b085.jpg',
    'https://i.pinimg.com/736x/47/96/a1/4796a1d06f323c31fd2c7407c43788b9.jpg'
  ];

  const handleEdit = () => {
    navigate('/edit-villa', {
      state: {
        title,
        location: loc,
        price,
        image,
        description,
        guests,
        area,
        bedType,
        features
      }
    });
  };

  return (
    <>
      <ViewVillaHeader />

      <div className="container py-5">
        <div className="row g-5">
          <VillaImages mainImage={image} title={title} roomImages={roomImages} />
          <VillaDetails
            title={title}
            location={loc}
            price={price}
            description={description}
            features={features}
            guests={guests}
            area={area}
            bedType={bedType}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </>
  );
};

export default ViewVilla;

import React from 'react';
import VillaCard from './VillaCard';

const villas = [
  {
    title: 'De Santika Nirwana',
    location: 'Ubud, Bali',
    price: 'Rp. 5.000.000 / Night',
    image: 'https://i.pinimg.com/736x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg'
  },
  {
    title: 'Grand Lavanya Hills',
    location: 'Ubud, Bali',
    price: 'Rp. 8.500.000 / Night',
    image: 'https://i.pinimg.com/736x/b3/1d/ac/b31dac2e3bf41b30d84f5e454e293b13.jpg'
  },
  {
    title: 'Samudra Biru Tropika',
    location: 'Ubud, Bali',
    price: 'Rp. 4.500.000 / Night',
    image: 'http://i.pinimg.com/736x/28/a8/8d/28a88d79127329f7f6cb7be2a18ad2f0.jpg'
  }
];

const MostViewed = () => (
  <section className="container pb-5">
    <h2 className="section-title">MOST VIEWED</h2>
    <p className="section-subtitle">Discover our top-rated villas by our guests</p>
    <div className="row g-4 justify-content-center">
      {villas.map((villa, index) => (
        <VillaCard key={index} {...villa} />
      ))}
    </div>
  </section>
);

export default MostViewed;

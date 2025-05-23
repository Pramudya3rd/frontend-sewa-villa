import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import OurVilla from '../pages/OurVilla';
import DetailsVilla from '../pages/DetailsVilla';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/our-villa" element={<OurVilla />} />
      <Route path="/villa-detail" element={<DetailsVilla />} />
    </Routes>
  );
}

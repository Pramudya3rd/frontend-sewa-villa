import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import OurVilla from '../pages/OurVilla';
import DetailsVilla from '../pages/DetailsVilla';
import Payment from '../pages/Payment';
import Confirmation from '../pages/Confirmation';
import Invoice from '../pages/Invoice';
import Login from '../pages/Login';
import Booking from '../pages/Booking';



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/our-villa" element={<OurVilla />} />
      <Route path="/villa-detail" element={<DetailsVilla />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/Confirmation" element={<Confirmation />} />
      <Route path="/Invoice" element={<Invoice />} />
      <Route path="/login" element={<Login />} />
       <Route path="/booking" element={<Booking />} />

    </Routes>
  );
}

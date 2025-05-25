import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import OurVilla from '../pages/OurVilla';
import DetailsVilla from '../pages/DetailsVilla';
import Payment from '../pages/Payment';
import Confirmation from '../pages/Confirmation';
import Invoice from '../pages/Invoice';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPasswordPage from '../pages/ForgotPassword'; 
import ResetPassword from '../pages/ResetPassword';
import PasswordUpdated from "../pages/PasswordUpdated";
import ProfilePage from "../pages/ProfilePage";
import AdminPage from "../pages/AdminPage";
import OwnerDashboard from "../pages/OwnerPage";
import AddVilla from "../pages/AddVilla"
import NotFoundPage from "../pages/NotFoundPage";
import ForbiddenPage from "../pages/ForbiddenPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/our-villa" element={<OurVilla />} />
      <Route path="/villa-detail" element={<DetailsVilla />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/invoice" element={<Invoice />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/owner" element={<OwnerDashboard />} />
      <Route path="/add-villa" element={<AddVilla />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} /> 
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/password-updated" element={<PasswordUpdated />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/forbidden" element={<ForbiddenPage />} />

    </Routes>
  );
}

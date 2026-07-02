import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navegacion from './Components/landing/Navegacion';
import Inicio from './Components/landing/Inicio';
import Menu from './Components/landing/Menu';
import Bebidas from './Components/landing/Bebidas';
import Nosotros from './Components/landing/Nosotros';
import Contacto from './Components/landing/Contacto';
import Footer from './Components/landing/Footer';
import Login from './Components/landing/Login';
import AdminLayout from './Components/dashboard/AdminLayout';
import DashboardPage from './Components/dashboard/DashboardPage';
import Menus from './Components/dashboard/menus';
import BebidasAdmin from './Components/dashboard/bebidas';
import Reservas from './Components/dashboard/reservas';
import Promos from './Components/dashboard/promos';
import Mesas from './Components/dashboard/mesas';
import Usuarios from './Components/dashboard/usuarios';

const LandingLayout = ({ children }) => (
  <>
    <Navegacion />
    {children}
    <Footer />
  </>
);

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<LandingLayout><Inicio /></LandingLayout>} />
        <Route path="/menu" element={<LandingLayout><Menu /></LandingLayout>} />
        <Route path="/bebidas" element={<LandingLayout><Bebidas /></LandingLayout>} />
        <Route path="/nosotros" element={<LandingLayout><Nosotros /></LandingLayout>} />
        <Route path="/contacto" element={<LandingLayout><Contacto /></LandingLayout>} />
        <Route path="/login" element={<LandingLayout><Login /></LandingLayout>} />

        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="menus" element={<Menus />} />
          <Route path="bebidas" element={<BebidasAdmin />} />
          <Route path="reservas" element={<Reservas />} />
          <Route path="promos" element={<Promos />} />
          <Route path="mesas" element={<Mesas />} />
          <Route path="usuarios" element={<Usuarios />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

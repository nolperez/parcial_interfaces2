import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout d-flex vh-100 overflow-hidden">
      <Sidebar />
      <div className="admin-main d-flex flex-column flex-grow-1 overflow-hidden w-100 min-vw-0">
        <Navbar />
        <main className="admin-content flex-grow-1 overflow-auto p-2 p-sm-3 p-md-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

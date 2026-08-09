import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './adminTheme.css';

const AdminLayout = () => {
  return (
    <div className="admin-theme d-flex vh-100 overflow-hidden">
      <Sidebar />
      <div className="d-flex flex-column flex-grow-1 overflow-hidden w-100 min-vw-0">
        <Navbar />
        <main className="admin-main flex-grow-1 overflow-auto p-2 p-md-3 w-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

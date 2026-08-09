import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import './utils/swal.css';
import './styles/forms.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { UIProvider } from './context/UIContext';

document.body.style.fontFamily = "'Poppins', sans-serif";
document.documentElement.style.fontFamily = "'Poppins', sans-serif";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UIProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UIProvider>
  </React.StrictMode>
);

reportWebVitals();

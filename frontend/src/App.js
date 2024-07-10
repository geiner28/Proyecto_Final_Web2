// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Client from './components/client'; // Cambio de 'Client' a 'ClientRoutes'
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './components/carContext';


import './styles/tailwind.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>


          <main>
            <Routes>
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/admin" element={<LoginForm />} />
  
              <Route path="/*" element={<Client />} /> {/* Rutas del cliente */}
            </Routes>
          </main>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

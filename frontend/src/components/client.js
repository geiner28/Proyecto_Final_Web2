// ClientRoutes.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CarList from './CarList';
import Cart from './Cart'; // Asegúrate de importar el componente Cart si aún no lo has hecho
import CartIcon from './CartIcon';

const ClientRoutes = () => {
  return (
    <div>
      <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold mr-4">Car Shop</h1>
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Soy Admin</Link>
        </div>
        <CartIcon />
      </header>
      <main>
        <Routes>
          <Route path="/cart" element={<Cart />} /> {/* Ruta para el carrito */}
          <Route path="/" element={<CarList />} /> {/* Ruta para la lista de carros */}
        </Routes>
      </main>
    </div>
  );
};

export default ClientRoutes;

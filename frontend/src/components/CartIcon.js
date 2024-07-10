// components/CartIcon.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './carContext';
import { FaShoppingCart } from 'react-icons/fa';  // Asegúrate de importar desde 'react-icons/fa'

const CartIcon = () => {
  const { cart } = useCart();
  const cartCount = cart.length;

  return (
    <Link to="/cart" className="relative">
      <FaShoppingCart className="text-3xl" />
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;

// components/CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (car) => {
    setCart(prevCart => {
      const existingCar = prevCart.find(item => item.id === car.id);
      if (existingCar) {
        return prevCart.map(item =>
          item.id === car.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...car, quantity: 1 }];
      }
    });
    console.log('Car added to cart:', car); // Debugging line
  };

  const removeFromCart = (carId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== carId));
  };

  const updateQuantity = (carId, newQuantity) => {
    setCart(prevCart => {
      return prevCart.map(item =>
        item.id === carId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const decreaseQuantity = (carId) => {
    setCart(prevCart => {
      return prevCart.map(item =>
        item.id === carId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, car) => total + car.price * car.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, decreaseQuantity, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

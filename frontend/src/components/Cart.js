// components/Cart.js
import React, { useState } from 'react';
import { useCart } from './carContext';
import axios from 'axios';

const Cart = () => {
  const { cart, getTotal, clearCart, updateQuantity, removeFromCart, decreaseQuantity } = useCart();
  const [clientData, setClientData] = useState({
    clientName: '',
    clientID: '',
    phone: '',
    email: '',
    address: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckout = async () => {
    const orderData = {
      ...clientData,
      cars: cart.map(car => ({
        id: car.id,
        quantity: car.quantity
      }))
    };

    try {
      const response = await axios.post('/api/orders', orderData);
      console.log('Order created:', response.data);
      clearCart(); // Clear the cart after successful order creation
      setOrderPlaced(true); // Set state to show order confirmation
    } catch (error) {
      console.error('Error creating order:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
    }
  };

  const handleReturnHome = () => {
    setOrderPlaced(false); // Reset order confirmation state
    window.location.href = '/'; // Redirect to home page
  };

  return (
    <div className="container mx-auto mt-8">
      {orderPlaced ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">¡Compra Finalizada!</h1>
          <h2 className="text-lg font-semibold">Factura:</h2>
          <p>Nombre del Cliente: {clientData.clientName}</p>
          <p>Identificación: {clientData.clientID}</p>
          <p>Teléfono: {clientData.phone}</p>
          <p>Correo Electrónico: {clientData.email}</p>
          <p>Dirección: {clientData.address}</p>
          <p>Productos:</p>
    
          <ul>
            {cart.map((car, index) => (
              <li key={index}>
                {car.name} - Cantidad: {car.quantity} - Precio Unitario: ${car.price} - Total: ${car.quantity * car.price}
              </li>
            ))}
          </ul>
          <p className="font-bold mt-4">Total: ${getTotal()}</p>
          <button
            onClick={handleReturnHome}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700"
          >
            Volver al Inicio
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
          <ul className="bg-white p-4 rounded-lg shadow-md">
            {cart.map((car, index) => (
              <li key={index} className="border-b py-2 flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{car.name}</h2>
                  <p>{car.description}</p>
                  <p>Cantidad: {car.quantity}</p>
                  <div className="flex mt-2">
                    <button onClick={() => decreaseQuantity(car.id)} className="text-gray-500 hover:text-gray-700 mr-2">-</button>
                    <button onClick={() => updateQuantity(car.id, car.quantity + 1)} className="text-gray-500 hover:text-gray-700">+</button>
                    <button onClick={() => removeFromCart(car.id)} className="ml-2 text-red-500 hover:text-red-700">Eliminar</button>
                  </div>
                </div>
                <div>
                  <span className="block">{car.brand}</span>
                  <span className="block">${car.price}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h2 className="text-xl font-bold">Total: ${getTotal()}</h2>
            
            {/* Formulario de Cliente */}
            <form className="mt-4">
              <input type="text" name="clientName" placeholder="Nombre del Cliente" value={clientData.clientName} onChange={handleChange} className="block w-full p-2 border rounded mb-2" />
              <input type="text" name="clientID" placeholder="Identificación del Cliente" value={clientData.clientID} onChange={handleChange} className="block w-full p-2 border rounded mb-2" />
              <input type="text" name="phone" placeholder="Teléfono" value={clientData.phone} onChange={handleChange} className="block w-full p-2 border rounded mb-2" />
              <input type="email" name="email" placeholder="Correo Electrónico" value={clientData.email} onChange={handleChange} className="block w-full p-2 border rounded mb-2" />
              <input type="text" name="address" placeholder="Dirección" value={clientData.address} onChange={handleChange} className="block w-full p-2 border rounded mb-4" />
            </form>

            {/* Botón de Finalizar Compra */}
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
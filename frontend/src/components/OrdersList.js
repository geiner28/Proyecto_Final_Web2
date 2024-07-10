import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [showAllOrders, setShowAllOrders] = useState(false); // Estado para mostrar todas las órdenes

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const toggleShowAllOrders = () => {
    setShowAllOrders(!showAllOrders);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }
    return date.toLocaleDateString();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Listado de Órdenes</h2>
      <button
        onClick={toggleShowAllOrders}
        className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 mb-4"
      >
        {showAllOrders ? 'Ocultar órdenes' : 'Mostrar todas las órdenes'}
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.slice(0, showAllOrders ? orders.length : 10).map((order) => (
          <div key={order.id} className="border p-4 rounded-lg shadow-lg">
            <div>
              <h3 className="text-xl font-bold">Orden #{order.id}</h3>
              <p><strong>Cliente:</strong> {order.clientName}</p>
              <p><strong>Identificación:</strong> {order.clientID}</p>
              <p><strong>Teléfono:</strong> {order.phone}</p>
              <p><strong>Correo Electrónico:</strong> {order.email}</p>
              <p><strong>Dirección:</strong> {order.address}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <h4 className="text-lg font-semibold mt-2">Carros:</h4>
              <ul>
                {order.Cars.map((car, index) => (
                  <li key={index}>
                    {car.name} - Cantidad: {car.OrderCar.quantity} - Precio Unitario: ${car.price}
                  </li>
                ))}
              </ul>
              <p><strong>Fecha:</strong> {formatDate(order.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;

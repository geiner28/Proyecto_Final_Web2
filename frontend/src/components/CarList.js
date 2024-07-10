// components/CarList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './carContext';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('/api/cars')
      .then(response => setCars(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <div key={car.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
            <img src={car.image} alt={car.name} className="mb-4" />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold">{car.name}</h2>
              <p className="mb-2">{car.description}</p>
              <p className="text-gray-600">Price: ${car.price}</p>
              <p className="text-gray-600">Stock: {car.stock}</p>
            </div>
            <button
              onClick={() => addToCart(car)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;

// src/components/CarForm.js
import React, { useState } from 'react';
import api from '../services/Api';

const CarForm = () => {
  const [car, setCar] = useState({
    name: '',
    model: '',
    brand: '',
    price: '',
    description: '',
    stock: '',
    image: ''
  });

  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar(prevCar => ({ ...prevCar, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.create(car); // Llama a la función para crear un nuevo carro
      setAlertMessage('Carro comprado exitosamente');
      setCar({
        name: '',
        model: '',
        brand: '',
        price: '',
        description: '',
        stock: '',
        image: ''
      });
    } catch (error) {
      console.error('Error saving car:', error);
      setAlertMessage('Error al comprar carro');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 shadow-md p-6 bg-blue rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Agregar Carro</h2>
      {alertMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          {alertMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre:</label>
          <input type="text" name="name" value={car.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Modelo:</label>
          <input type="text" name="model" value={car.model} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Marca:</label>
          <input type="text" name="brand" value={car.brand} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Precio:</label>
          <input type="text" name="price" value={car.price} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripción:</label>
          <textarea name="description" value={car.description} onChange={handleChange} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Stock:</label>
          <input type="text" name="stock" value={car.stock} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Imagen (URL):</label>
          <input type="text" name="image" value={car.image} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Guardar</button>
      </form>
    </div>
  );
};

export default CarForm;

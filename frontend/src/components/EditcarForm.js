import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/Api';

const EditCarForm = ({ onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({
    name: '',
    model: '',
    brand: ''
    // Agrega aquí todas las propiedades que tenga tu carro
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await api.getById(id);
        setCar(response.data); // Asumiendo que la API devuelve un objeto con datos de carro
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };

    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar(prevCar => ({ ...prevCar, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.update(id, car);
      onUpdate(id, car); // Llama a la función para actualizar el carro en Dashboard
      alert('Carro actualizado exitosamente');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  if (!car.name) {
    return <p>Cargando...</p>;
  }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Editar Carro</h2>
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditCarForm;

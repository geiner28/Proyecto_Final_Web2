import React, { useState, useEffect } from 'react';
import EditCarForm from './EditcarForm';
import CarForm from './CarForm';
import api from '../services/Api'; // Asumiendo que Api.js exporta un objeto con funciones getAll, update, remove
import { useAuth } from '../context/AuthContext'; // Asumiendo que tienes un contexto de autenticación para el logout
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useAuth(); // Hook para el logout
  const browse = useNavigate();
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await api.getAll();
      setCars(response); // Asumiendo que response es directamente el array de carros
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleEditCar = (car) => {
    setEditingCar(car); // Actualiza editingCar con el objeto completo del carro
  };

  const handleUpdateCar = async (id, updatedData) => {
    try {
      await api.update(id, updatedData);
      // Actualizar la lista de carros después de la actualización
      fetchCars();
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCar(null); // Cancelar la edición limpiando editingCar
  };

  const handleLogout = async () => {
    try {
      await logout(); // Función para el logout del contexto de autenticación
      browse('/login'); // Redireccionar a la página de login después del logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCreateCar = async (newCar) => {
    try {
      await api.create(newCar); // Asumiendo que tienes una función create en tu API
      // Recargar la lista de carros después de la creación
      fetchCars();
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await api.remove(id); // Asumiendo que tienes una función remove en tu API
      setCars(cars.filter((car) => car.id !== id)); // Filtrar los carros para eliminar el carro con el id especificado
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div>
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <ul>
        {cars.map((car) => (
          <li key={car.id} className="flex items-center justify-between border-b border-gray-200 py-2">
            <div>
              {car.name} - {car.model} - {car.brand}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditCar(car)}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteCar(car.id)}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingCar ? (
        <EditCarForm
          car={editingCar}
          onCancelEdit={handleCancelEdit}
          onUpdateCar={handleUpdateCar}
        />
      ) : (
        <CarForm onCreateCar={handleCreateCar} />
      )}
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/Api';
import CarForm from './CarForm';
import CarItem from './CarItem';
import EditCarForm from './EditcarForm'; // Importa el formulario de edición

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [editingCar, setEditingCar] = useState(null); // Estado para almacenar el carro que se está editando

  useEffect(() => {
    fetchCars();
  }, [showAll, searchTerm]);

  const fetchCars = async () => {
    try {
      let data = [];
      if (showAll) {
        data = await api.getAll();
      } else if (searchTerm) {
        data = await api.searchByName(searchTerm);
      }
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.remove(id);
      setCars(cars.filter(car => car.id !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleSearch = async () => {
    setSearchTerm('');
    setShowAll(false);
  };

  const handleShowAll = async () => {
    setSearchTerm('');
    setShowAll(true);
  };

  const handleEditCar = (car) => {
    setEditingCar(car); // Establece el carro a editar en el estado
  };

  const handleCancelEdit = () => {
    setEditingCar(null); // Cancela la edición, vuelve a null
  };

  const handleUpdateCar = async (id, updatedCar) => {
    try {
      await api.update(id, updatedCar);
      const updatedCars = cars.map(car => car.id === id ? updatedCar : car);
      setCars(updatedCars);
      setEditingCar(null); // Finaliza la edición y vuelve a null
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleCreateCar = async (newCar) => {
    try {
      const response = await api.create(newCar);
      setCars([...cars, response.data]);
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  return (
    <div>
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="flex space-x-4">
          {!showAll && (
            <>
              <button onClick={handleShowAll} className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Mostrar Todos los Carros
              </button>
              <button onClick={handleSearch} className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                Buscar Carro por Nombre
              </button>
            </>
          )}
          <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
            Cerrar Sesión
          </button>
        </div>
      </header>

      {editingCar ? (
        <EditCarForm car={editingCar} onCancelEdit={handleCancelEdit} onUpdateCar={handleUpdateCar} />
      ) : (
        <>
          {showAll ? (
            <div className="max-w-4xl mx-auto mt-8">
              <h2 className="text-2xl font-bold mb-4">Lista de Carros</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map(car => (
                  <CarItem key={car.id} car={car} onDelete={handleDelete} onEdit={handleEditCar} />
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
              <CarForm onCreate={handleCreateCar} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;

import React, { useState, useEffect } from 'react';
import EditCarForm from './EditcarForm';
import CarForm from './CarForm';
import api from '../services/Api'; // Asumiendo que Api.js exporta un objeto con funciones getAll, update, remove
import { useAuth } from '../context/AuthContext'; // Asumiendo que tienes un contexto de autenticación para el logout
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useAuth(); // Hook para el logout
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [displayedCars, setDisplayedCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [showAllCars, setShowAllCars] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); // Estado para mostrar el formulario de edición

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await api.getAll();
      setCars(response);
      setDisplayedCars(response.slice(-5)); // Mostrar los últimos 5 carros agregados
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleEditCar = (car) => {
    setEditingCar(car); // Actualiza editingCar con el objeto completo del carro
    setShowEditForm(true); // Mostrar el formulario de edición al editar un carro
  };

  const handleUpdateCar = async (id, updatedData) => {
    try {
      await api.update(id, updatedData);
      fetchCars();
      setEditingCar(null); // Limpiar el estado de edición después de actualizar
      setShowEditForm(false); // Ocultar el formulario de edición después de actualizar
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCar(null); // Cancelar la edición limpiando editingCar
    setShowEditForm(false); // Ocultar el formulario de edición al cancelar
  };

  const handleLogout = async () => {
    try {
      await logout(); // Función para el logout del contexto de autenticación
      navigate('/login'); // Redireccionar a la página de login después del logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCreateCar = async (newCar) => {
    try {
      await api.create(newCar);
      fetchCars();
      setShowCreateForm(false); // Ocultar el formulario de creación después de crear un carro
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await api.remove(id);
      setCars(cars.filter((car) => car.id !== id));
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleShowAllCars = () => {
    setShowAllCars(!showAllCars);
    setDisplayedCars(showAllCars ? cars.slice(-5) : cars);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const filteredCars = cars.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedCars(filteredCars);
    } else {
      setDisplayedCars(cars.slice(-5));
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

      <form onSubmit={handleSearch} className="my-4">
        <input
          type="text"
          placeholder="Buscar carro por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Buscar
        </button>
        <button
          type="button"
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 ml-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Agregar
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedCars.map((car) => (
          <div key={car.id} className="border p-4 rounded-lg shadow-lg">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={car.image}
                alt={car.name}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder.jpg'; // O una imagen de relleno o de error
                }}
              />
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold">{car.name}</h2>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <p className="font-semibold">Modelo:</p>
                <p>{car.model}</p>
                <p className="font-semibold">Marca:</p>
                <p>{car.brand}</p>
                <p className="font-semibold">Precio:</p>
                <p>{car.price}</p>
                <p className="font-semibold">Stock:</p>
                <p>{car.stock}</p>
              </div>
              <div className="flex space-x-2 mt-4">
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
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleShowAllCars}
        className="mt-4 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800"
      >
        {showAllCars ? 'Mostrar menos' : 'Mostrar todos'}
      </button>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md mx-auto h-auto">
            <button
              onClick={() => setShowCreateForm(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              &times;
            </button>
            <CarForm onCreateCar={handleCreateCar} />
          </div>
        </div>
      )}

      {showEditForm && editingCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md mx-auto h-auto">
            <button
              onClick={() => {
                setShowEditForm(false);
                setEditingCar(null);
              }}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              &times;
            </button>
            <EditCarForm
              car={editingCar}
              onCancelEdit={handleCancelEdit}
              onUpdateCar={handleUpdateCar}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

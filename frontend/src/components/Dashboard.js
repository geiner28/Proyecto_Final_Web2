// Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarItem from './CarItem';
import EditCarForm from './EditarForm';

function Dashboard() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);

  // Función para manejar la edición de un carro
  const handleEdit = (car) => {
    setEditingCar(car);
  };

  // Función para actualizar el carro editado
  const handleUpdateCar = (updatedCar) => {
    const updatedCars = cars.map(car => car.id === updatedCar.id ? updatedCar : car);
    setCars(updatedCars);
    setEditingCar(null); // Limpiar el carro en edición
  };

  return (
    <div>
      {/* Renderizar CarItem con el formulario de edición */}
      {editingCar ? (
        <EditCarForm car={editingCar} onUpdate={handleUpdateCar} onCancel={() => setEditingCar(null)} />
      ) : (
        <div className="max-w-4xl mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">Lista de Carros</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map(car => (
              <CarItem key={car.id} car={car} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

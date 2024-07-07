import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/Api';

const EditCarForm = ({ car, onCancelEdit, onUpdateCar }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({}); // Inicializar formData como objeto vacío

  useEffect(() => {
    // Actualizar formData con los datos del carro cuando cambie
    setFormData({
      name: car.name || '',
      model: car.model || '',
      brand: car.brand || '',
      price: car.price || '',
      description: car.description || '',
      stock: car.stock || '',
      image: car.image || ''
    });
  }, [car]); // Dependencia de efecto: car, para actualizar cuando cambie

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.update(car.id, formData); // Llamar a la función de actualización con el id del carro
      onUpdateCar(car.id, formData); // Actualizar el carro en el Dashboard
      alert('Carro actualizado exitosamente');
      onCancelEdit(); // Cancelar la edición
    } catch (error) {
      console.error('Error updating car:', error);
      alert('Hubo un error al actualizar el carro');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Editar Carro</h2>
      <form onSubmit={handleSubmit}>
        {/* Renderizar inputs para cada campo en formData */}
        {Object.keys(formData).map((key) => (
          <div className="mb-4" key={key}>
            <label className="block text-sm font-medium text-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        ))}
        {/* Botones para guardar cambios y cancelar */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Guardar Cambios
        </button>
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={onCancelEdit}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditCarForm;

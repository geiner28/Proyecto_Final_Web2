// src/components/CarList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/Api';
import CarItem from './CarItem';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getAll();
      setCars(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await api.remove(id);
    setCars(cars.filter(car => car.id !== id));
  };

  return (
    <div>
      <h2>Listado de Carros</h2>
      <Link to="/add" className="btn btn-primary mb-3">Agregar Carro</Link>
      <div className="row">
        {cars.map(car => (
          <CarItem key={car.id} car={car} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default CarList;

// src/components/CarDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/Api';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.get(id);
      setCar(data);
    };
    fetchData();
  }, [id]);

  if (!car) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Detalles del Carro</h2>
      <div>
        <h3>{car.name}</h3>
        <p>Modelo: {car.model}, Marca: {car.brand}</p>
        <p>Precio: ${car.price}</p>
        <p>Descripción: {car.description}</p>
        <p>Stock: {car.stock}</p>
        <img src={car.image} alt={car.name} style={{ maxWidth: '400px' }} />
      </div>
    </div>
  );
};

export default CarDetails;

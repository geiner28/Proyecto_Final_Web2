import React from 'react';
import { Link } from 'react-router-dom';

const CarItem = ({ car, onDelete, onEdit }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{car.name}</h5>
          <p className="card-text">{car.model}, {car.brand}</p>
          <Link to={`/cars/${car.id}`} className="btn btn-primary mr-2">Ver Detalles</Link>
          <button onClick={() => onEdit(car)} className="btn btn-secondary mr-2">Editar</button>
          <button className="btn btn-danger" onClick={() => onDelete(car.id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default CarItem;

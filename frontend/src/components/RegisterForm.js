import React, { useState } from 'react';
import { registerUser } from '../services/authServices';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = await registerUser(username, password);
      console.log('Usuario registrado exitosamente. Token:', token);
      // Mostrar alerta y redirigir al usuario al login
      alert('Usuario registrado exitosamente');
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar el usuario:', error.message);
      setError('Error al registrar el usuario');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Registrarse
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">¿Ya tienes una cuenta?</p>
          <button
            onClick={handleLoginClick}
            className="text-blue-500 hover:text-blue-600 focus:outline-none"
          >
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;

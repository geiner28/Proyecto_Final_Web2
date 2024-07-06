// src/services/authService.js

async function registerUser(username, password) {
    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al registrar el usuario');
      }
  
      const data = await response.json();
      const { token } = data; // Suponiendo que el backend responde con un token
  
      // Aquí puedes guardar el token en localStorage, contexto de React, etc.
  
      return token;
    } catch (error) {
      console.error('Error al registrar el usuario:', error.message);
      throw error;
    }


  }


  export const loginUser = async (username, password) => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }
  
      const data = await response.json();
      return data.token;
    } catch (error) {
      throw new Error(error.message);
    }
};
  
  export { registerUser };
  
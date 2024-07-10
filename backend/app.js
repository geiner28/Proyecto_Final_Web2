// app.js

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRoutes = require('./routes/auth'); // Importa las rutas de autenticación
const carRoutes = require('./routes/cars'); // Importa las rutas de los carros
const orderRoutes = require('./routes/orders'); // Importa las rutas de los pedidos
const cors = require('cors');
const db = require('./models'); // Importa la configuración de Sequelize y la conexión a la base de datos

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Permitir solo solicitudes desde este origen
  optionsSuccessStatus: 200, // Algunos navegadores no envían correctamente el código de estado 204
};
app.use(cors(corsOptions));

// Middleware para procesar bodies JSON
app.use(bodyParser.json());

// Middleware de Passport para autenticación
app.use(passport.initialize());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de pedidos
app.use('/api/orders', orderRoutes);

// Rutas de carros
app.use('/api/cars', carRoutes);

// Conexión a la base de datos y levantar el servidor
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error al conectar a la base de datos:', err);
});

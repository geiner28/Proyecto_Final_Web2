const express = require('express');
const router = express.Router();
const db = require('../models'); // Importa la configuración de Sequelize y los modelos
const { Car } = db; // Asegúrate de importar correctamente el modelo Car

// GET: Obtener todos los carros
router.get('/', async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
    console.error('Error al obtener carsros:', error);
    res.status(500).json({ message: 'Error al obtener carros' });
  }
});

// POST: Crear un nuevo carro
router.post('/', async (req, res) => {
  try {
    const { name, model, brand, price, description, stock, image } = req.body;
    const newCar = await Car.create({
      name,
      model,
      brand,
      price,
      description,
      stock,
      image
    });
    res.json(newCar);
  } catch (error) {
    console.error('Error al crear carro:', error);
    res.status(500).json({ message: 'Error al crear carro' });
  }
});

// GET: Obtener un carro por ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Carro no encontrado' });
    }
    res.json(car);
  } catch (error) {
    console.error('Error al obtener carro por ID:', error);
    res.status(500).json({ message: 'Error al obtener carro por ID' });
  }
});

// PUT: Actualizar un carro por ID
router.put('/:id', async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Carro no encontrado' });
    }
    
    // Valores antiguos del carro
    const oldValues = {
      name: car.name,
      model: car.model,
      brand: car.brand,
      price: car.price,
      description: car.description,
      stock: car.stock,
      image: car.image
    };
    
    const { name, model, brand, price, description, stock, image } = req.body;
    
    // Actualiza el carro con los nuevos valores
    await car.update({
      name,
      model,
      brand,
      price,
      description,
      stock,
      image
    });
    
    res.json({
      message: 'Carro actualizado correctamente',
      oldValues,
      newValues: car
    });
  } catch (error) {
    console.error('Error al actualizar carro:', error);
    res.status(500).json({ message: 'Error al actualizar carro' });
  }
});

// DELETE: Eliminar un carro por ID
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Carro no encontrado' });
    }
    await car.destroy();
    res.json({ message: 'Carro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar carro:', error);
    res.status(500).json({ message: 'Error al eliminar carro' });
  }
});

module.exports = router;

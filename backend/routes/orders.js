const express = require('express');
const router = express.Router();
const db = require('../models');

const { Order, Car } = db;

// POST: Crear un nuevo pedido
router.post('/', async (req, res) => {
  const { clientName, clientID, phone, email, address, cars } = req.body;

  try {
    const order = await Order.create({
      clientName,
      clientID,
      phone,
      email,
      address,
      total: cars.reduce((sum, car) => sum + car.price * car.quantity, 0)
    });

    for (const car of cars) {
      await order.addCar(car.id, { through: { quantity: car.quantity } });

      // Update car stock
      const carToUpdate = await Car.findByPk(car.id);
      if (carToUpdate.stock >= car.quantity) {
        carToUpdate.stock -= car.quantity;
        await carToUpdate.save();
      } else {
        return res.status(400).json({ message: `Not enough stock for car ${carToUpdate.name}` });
      }
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ message: 'Error al crear pedido', error });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Address = require('../models/Address');

// Route to add a new user and address
router.post('/register', async (req, res) => {
  const { name, street, city } = req.body;

  try {
    // Create a new user
    const newUser = new User({ name });
    await newUser.save();

    // Create a new address
    const newAddress = new Address({
      street,
      city,
      userId: newUser._id,
    });
    await newAddress.save();

    res.status(201).json({ message: 'User and address added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

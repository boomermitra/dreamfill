// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Define routes
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { toggleFavorite, getFavorites } = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getFavorites);

router.route('/:restaurantId')
  .post(protect, toggleFavorite);

module.exports = router;

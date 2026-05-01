const express = require('express');
const router = express.Router();
const {
  getRestaurants,
  getRestaurant,
  createRestaurant
} = require('../controllers/restaurantController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getRestaurants)
  .post(protect, createRestaurant);

router.route('/:id')
  .get(getRestaurant);

module.exports = router;

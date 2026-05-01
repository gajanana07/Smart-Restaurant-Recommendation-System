const Restaurant = require('../models/Restaurant');

// @desc    Get all restaurants (with search, filter, sort, pagination)
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = async (req, res, next) => {
  try {
    const { search, cuisine, rating, sort, page = 1, limit = 10 } = req.query;

    // Build query object
    let queryObj = {};

    // Search by name
    if (search) {
      queryObj.name = { $regex: search, $options: 'i' };
    }

    // Filter by cuisine
    if (cuisine) {
      queryObj.cuisine = cuisine;
    }

    // Filter by minimum rating
    if (rating) {
      queryObj.averageRating = { $gte: Number(rating) };
    }

    let query = Restaurant.find(queryObj);

    // Sorting
    if (sort) {
      // sort format: sort=averageRating,-createdAt
      const sortBy = sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      // Default sort by newest
      query = query.sort('-createdAt');
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;
    const total = await Restaurant.countDocuments(queryObj);

    query = query.skip(startIndex).limit(limitNum);

    // Execute query
    const restaurants = await query;

    // Pagination result
    const pagination = {
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum)
    };

    res.status(200).json({
      success: true,
      count: restaurants.length,
      pagination,
      data: restaurants
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single restaurant
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      res.status(404);
      throw new Error(`Restaurant not found with id of ${req.params.id}`);
    }

    res.status(200).json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new restaurant
// @route   POST /api/restaurants
// @access  Private
const createRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.create(req.body);

    res.status(201).json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRestaurants,
  getRestaurant,
  createRestaurant
};

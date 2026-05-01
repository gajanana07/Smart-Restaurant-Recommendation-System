const Restaurant = require('../models/Restaurant');

// @desc    Add review
// @route   POST /api/reviews/:restaurantId
// @access  Private
const addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const restaurantId = req.params.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      res.status(404);
      throw new Error('Restaurant not found');
    }

    // Check if user already submitted a review
    const alreadyReviewed = restaurant.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Restaurant already reviewed by this user');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    };

    restaurant.reviews.push(review);

    await restaurant.calculateAverageRating();

    res.status(201).json({
      success: true,
      message: 'Review added',
      data: restaurant.reviews
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addReview
};

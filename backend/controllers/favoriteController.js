const User = require('../models/User');

// @desc    Toggle favorite
// @route   POST /api/favorites/:restaurantId
// @access  Private
const toggleFavorite = async (req, res, next) => {
  try {
    const restaurantId = req.params.restaurantId;
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Check if restaurant is already in favorites
    const isFavorite = user.favorites.includes(restaurantId);

    if (isFavorite) {
      // Remove from favorites
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== restaurantId.toString()
      );
    } else {
      // Add to favorites
      user.favorites.push(restaurantId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: user.favorites,
      message: isFavorite ? 'Removed from favorites' : 'Added to favorites'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user favorites
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({
      success: true,
      count: user.favorites.length,
      data: user.favorites
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  toggleFavorite,
  getFavorites
};

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  cuisine: {
    type: String,
    required: [true, 'Please add a cuisine type']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  averageRating: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  reviews: [reviewSchema],
  numReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Update average rating dynamically when reviews are added
restaurantSchema.methods.calculateAverageRating = async function() {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
    this.numReviews = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.averageRating = (sum / this.reviews.length).toFixed(1);
    this.numReviews = this.reviews.length;
  }
  await this.save();
};

module.exports = mongoose.model('Restaurant', restaurantSchema);

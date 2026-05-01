const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Restaurant = require('./models/Restaurant');
const User = require('./models/User');
const restaurantsData = require('./data/restaurants');

dotenv.config();

const importData = async () => {
  try {
    await connectDB();
    // Clear existing data (optional, be careful in production!)
    await Restaurant.deleteMany();
    await User.deleteMany();

    // Insert dummy restaurants
    await Restaurant.insertMany(restaurantsData);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Restaurant.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destruction: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

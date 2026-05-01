import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Star, TrendingUp, Heart } from 'lucide-react';
import api from '../services/api';
import RestaurantCard from '../components/RestaurantCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        // Fetch top rated
        const topRes = await api.get('/restaurants?sort=-averageRating&limit=4');
        setTopRestaurants(topRes.data.data);

        // Fetch user favorites if logged in
        if (user) {
          const favRes = await api.get('/favorites');
          setFavoriteRestaurants(favRes.data.data);
        }
      } catch (error) {
        console.error('Error fetching home data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [user]);

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative rounded-[2.5rem] overflow-hidden bg-indigo-900 text-white shadow-2xl animate-fade-in-up">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1934&q=80"
            alt="Hero background"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-indigo-900/90 to-transparent" />
        </div>
        <div className="relative z-10 px-8 py-32 sm:px-16 lg:px-24 max-w-4xl">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-sm font-semibold tracking-wider mb-6 animate-fade-in-up delay-100 backdrop-blur-sm">
            DISCOVER THE EXTRAORDINARY
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight animate-fade-in-up delay-200">
            Find the Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white">Place to Eat</span>
          </h1>
          <p className="text-xl sm:text-2xl text-indigo-100/90 mb-12 max-w-2xl font-light animate-fade-in-up delay-300">
            Explore curated collections of the best restaurants, hidden gems, and local favorites around you.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
            <Link to="/restaurants" className="btn bg-white text-indigo-900 hover:bg-indigo-50 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Explore Collections
            </Link>
            {!user && (
              <Link to="/register" className="btn-secondary bg-indigo-800/50 backdrop-blur-md text-white border-indigo-700/50 hover:bg-indigo-700/50 px-8 py-4 text-lg rounded-xl transition-all duration-300">
                Join Community
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="animate-fade-in-up delay-200">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Trending Places</h2>
              <p className="text-gray-500 mt-1">Highest rated restaurants this week</p>
            </div>
          </div>
          <Link to="/restaurants?sort=-averageRating" className="text-indigo-600 font-medium hover:text-indigo-700 hidden sm:block group">
            View all <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </section>

      {/* Favorites / Recommended Section */}
      {user && (
        <section className="bg-gray-50 rounded-3xl p-8 sm:p-12 border border-gray-100">
          <div className="flex justify-between items-end mb-8">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-red-500 fill-current" />
              <h2 className="text-3xl font-bold text-gray-900">Your Favorites</h2>
            </div>
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : favoriteRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
              <Utensils className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No favorites yet</h3>
              <p className="text-gray-500 mb-6">Start exploring to build your personalized list of favorites.</p>
              <Link to="/restaurants" className="btn">
                Discover Restaurants
              </Link>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Home;

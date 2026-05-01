import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Heart, MapPin } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const RestaurantCard = ({ restaurant }) => {
  const { user, toggleFavorite } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const isFavorite = user?.favorites?.includes(restaurant._id);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await toggleFavorite(restaurant._id);
    } catch (error) {
      console.error('Failed to toggle favorite');
    }
  };

  return (
    <Link to={`/restaurants/${restaurant._id}`} className="group block h-full animate-fade-in-up">
      <div className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 h-full flex flex-col relative transform hover:-translate-y-2">
        <div className="relative h-56 w-full overflow-hidden">
          <img 
            src={restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          
          <div className="absolute top-4 right-4 z-10">
            <button 
              onClick={handleFavoriteClick}
              className={`p-2.5 rounded-full backdrop-blur-md bg-white/80 shadow-lg transition-all duration-300 hover:scale-110 ${isFavorite ? 'text-red-500 hover:bg-white' : 'text-gray-500 hover:text-red-500 hover:bg-white'}`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold tracking-wide bg-white/90 backdrop-blur-md shadow-lg text-indigo-900 uppercase">
              {restaurant.cuisine}
            </span>
          </div>
        </div>
        
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded text-green-700 text-sm font-medium">
              <span>{restaurant.averageRating}</span>
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{restaurant.location}</span>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mt-auto">
            {restaurant.description}
          </p>
          
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>{restaurant.numReviews} {restaurant.numReviews === 1 ? 'Review' : 'Reviews'}</span>
            <span className="text-indigo-600 font-medium">View details &rarr;</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;

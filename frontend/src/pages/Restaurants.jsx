import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import api from '../services/api';
import RestaurantCard from '../components/RestaurantCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    cuisine: '',
    rating: '',
    sort: '-createdAt'
  });
  const [pagination, setPagination] = useState(null);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      let queryStr = `?sort=${filters.sort}`;
      
      if (searchTerm) queryStr += `&search=${searchTerm}`;
      if (filters.cuisine) queryStr += `&cuisine=${filters.cuisine}`;
      if (filters.rating) queryStr += `&rating=${filters.rating}`;
      
      const res = await api.get(`/restaurants${queryStr}`);
      setRestaurants(res.data.data);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error('Error fetching restaurants', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchRestaurants();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Explore Restaurants</h1>
        
        {/* Search and Filters Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by restaurant name..."
              className="input-field pl-10 bg-gray-50 border-transparent focus:bg-white w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-gray-400" />
              <select
                name="cuisine"
                value={filters.cuisine}
                onChange={handleFilterChange}
                className="input-field py-2 pr-8"
              >
                <option value="">All Cuisines</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="Indian">Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
                <option value="American">American</option>
              </select>
            </div>

            <select
              name="rating"
              value={filters.rating}
              onChange={handleFilterChange}
              className="input-field py-2 pr-8"
            >
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>

            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
              className="input-field py-2 pr-8"
            >
              <option value="-createdAt">Newest</option>
              <option value="-averageRating">Highest Rated</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : restaurants.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
          
          {/* Pagination (Simplified) */}
          {pagination && pagination.pages > 1 && (
            <div className="mt-12 flex justify-center text-sm text-gray-500">
              Showing page {pagination.page} of {pagination.pages}
              {/* Pagination controls could be added here */}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-xl text-gray-600 mb-2">No restaurants found</p>
          <p className="text-gray-400">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurants;

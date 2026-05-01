import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Heart, Utensils, MessageSquare } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

const RestaurantDetails = () => {
  const { id } = useParams();
  const { user, toggleFavorite } = useContext(AuthContext);
  
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [error, setError] = useState('');

  const isFavorite = user?.favorites?.includes(id);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await api.get(`/restaurants/${id}`);
        setRestaurant(res.data.data);
      } catch (err) {
        setError('Failed to load restaurant details');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleFavoriteClick = async () => {
    if (!user) return; // In a real app, maybe redirect to login
    try {
      await toggleFavorite(id);
    } catch (error) {
      console.error('Failed to toggle favorite');
    }
  };

  const handleAddReview = async (reviewData) => {
    try {
      setReviewLoading(true);
      const res = await api.post(`/reviews/${id}`, reviewData);
      
      // Update local restaurant state with new reviews
      // Also need to refetch or manually update averageRating, but for simplicity we reload
      const updatedRes = await api.get(`/restaurants/${id}`);
      setRestaurant(updatedRes.data.data);
      
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add review');
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  
  if (error || !restaurant) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-xl">{error || 'Restaurant not found'}</p>
        <Link to="/restaurants" className="text-indigo-600 mt-4 inline-block">Back to restaurants</Link>
      </div>
    );
  }

  const hasReviewed = user ? restaurant.reviews.some(r => r.user === user._id) : false;

  return (
    <div className="max-w-5xl mx-auto py-6">
      {/* Header Image */}
      <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden mb-8 shadow-sm">
        <img 
          src={restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between items-end">
          <div>
            <div className="flex gap-2 mb-3">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium">
                {restaurant.cuisine}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex items-center text-gray-200">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{restaurant.location}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-400">
                {restaurant.averageRating} <Star className="w-6 h-6 fill-current" />
              </div>
              <span className="text-sm text-gray-200">{restaurant.numReviews} reviews</span>
            </div>
            
            {user && (
              <button 
                onClick={handleFavoriteClick}
                className={`p-4 rounded-xl backdrop-blur-md transition-colors ${isFavorite ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-white/20 text-white hover:bg-white/30'}`}
              >
                <Heart className={`w-8 h-8 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Utensils className="w-6 h-6 text-indigo-600" /> About
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {restaurant.description}
            </p>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-indigo-600" /> Reviews ({restaurant.numReviews})
            </h2>
            <ReviewList reviews={restaurant.reviews} />
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            {user ? (
              hasReviewed ? (
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 text-center">
                  <h3 className="font-semibold text-indigo-900 mb-2">Thanks for reviewing!</h3>
                  <p className="text-sm text-indigo-700">You've already shared your thoughts on this restaurant.</p>
                </div>
              ) : (
                <ReviewForm onSubmit={handleAddReview} loading={reviewLoading} />
              )
            ) : (
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Want to review?</h3>
                <p className="text-sm text-gray-600 mb-4">Please log in to share your experience and add a rating.</p>
                <Link to="/login" className="btn w-full">Log In to Review</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;

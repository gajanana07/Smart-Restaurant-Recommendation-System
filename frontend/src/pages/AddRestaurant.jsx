import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Store, Loader2 } from 'lucide-react';
import api from '../services/api';

const AddRestaurant = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    cuisine: 'American',
    location: '',
    description: '',
    image: ''
  });

  // If not logged in, theoretically shouldn't reach here due to protected route, but safety first
  if (!user) {
    navigate('/login');
    return null;
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/restaurants', formData);
      navigate('/restaurants');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add restaurant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
          <Store className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">Add a New Restaurant</h1>
        <p className="mt-2 text-gray-600">Know a great place? Share it with the community.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={onSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={onChange}
                className="input-field"
                placeholder="e.g. The Golden Spoon"
              />
            </div>

            <div>
              <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-1">Cuisine Type</label>
              <select
                name="cuisine"
                id="cuisine"
                required
                value={formData.cuisine}
                onChange={onChange}
                className="input-field bg-white"
              >
                <option value="American">American</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="Indian">Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
                <option value="Thai">Thai</option>
                <option value="French">French</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                required
                value={formData.location}
                onChange={onChange}
                className="input-field"
                placeholder="e.g. 123 Main St, NY"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
              <input
                type="url"
                name="image"
                id="image"
                value={formData.image}
                onChange={onChange}
                className="input-field"
                placeholder="https://example.com/image.jpg"
              />
              <p className="mt-1 text-xs text-gray-500">Leave blank to use a default placeholder image.</p>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                id="description"
                rows="4"
                required
                value={formData.description}
                onChange={onChange}
                className="input-field resize-none"
                placeholder="Tell us what makes this place special..."
              ></textarea>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/restaurants')}
              className="btn-secondary mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn min-w-[150px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Add Restaurant'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;

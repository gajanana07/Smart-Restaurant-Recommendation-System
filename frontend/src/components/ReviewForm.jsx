import React, { useState } from 'react';
import { Star } from 'lucide-react';

const ReviewForm = ({ onSubmit, loading }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => {
            const indexVal = index + 1;
            return (
              <button
                type="button"
                key={indexVal}
                className={`w-8 h-8 transition-colors ${
                  indexVal <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                onClick={() => setRating(indexVal)}
                onMouseEnter={() => setHover(indexVal)}
                onMouseLeave={() => setHover(rating)}
              >
                <Star className="w-8 h-8 fill-current" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Review details
        </label>
        <textarea
          id="comment"
          rows="4"
          className="input-field resize-none"
          placeholder="What did you like or dislike?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading || rating === 0 || !comment.trim()}
        className="btn w-full"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;

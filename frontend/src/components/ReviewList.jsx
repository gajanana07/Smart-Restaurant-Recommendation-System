import React from 'react';
import { Star } from 'lucide-react';

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>;
  }

  // Sort reviews by newest first
  const sortedReviews = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="space-y-6">
      {sortedReviews.map((review) => (
        <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                {review.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{review.name}</h4>
                <p className="text-xs text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-700 mt-2 pl-13">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;

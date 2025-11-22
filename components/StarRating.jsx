import React from 'react';

const Star = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'text-amber-400' : 'text-slate-300 dark:text-slate-500'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const StarRating = ({ rating, totalStars = 5 }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: totalStars }, (_, index) => (
        <Star key={index} filled={index < Math.round(rating)} />
      ))}
       {rating > 0 && <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">{rating.toFixed(1)}</span>}
       {rating === 0 && <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">Not yet rated</span>}
    </div>
  );
};

export default StarRating;

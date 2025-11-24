import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const BookCard = ({ book }) => {
  return (
    <Link to={`/book/${book.id}`} className="block group">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden group-hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col h-full">
        <div className="relative">
          <img src={book.coverImage} alt={`Cover of ${book.title}`} className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{book.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">by {book.author}</p>
          <div className="mb-3">
            <StarRating rating={book.rating} />
          </div>
          <span className="inline-block bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full mb-3 self-start">{book.genre}</span>
          <p className="text-sm text-slate-500 dark:text-slate-400 flex-grow mb-4">{book.description.substring(0, 80)}...</p>
          <div className="flex items-center justify-end mt-auto pt-2">
            <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {book.isFree ? 'Free' : `₹${book.price.toFixed(2)}`}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;

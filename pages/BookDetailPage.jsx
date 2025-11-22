import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBooks } from '../context/BooksContext';
import StarRating from '../components/StarRating';

const BookDetailPage = () => {
  const { id } = useParams();
  const { books } = useBooks();
  const book = books.find(b => b.id === id);

  if (!book) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Book Not Found</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">We couldn't find the book you were looking for.</p>
        <Link
          to="/browse"
          className="inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Return to Browse
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/browse" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
          &larr; Back to Browse
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-1">
          <img
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">{book.title}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-4">by {book.author}</p>

          <div className="flex items-center space-x-4 mb-6">
            <StarRating rating={book.rating} />
            <span className="inline-block bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 text-sm font-semibold px-3 py-1 rounded-full">{book.genre}</span>
          </div>

          {(book.pages || book.publisher || book.publicationDate) && (
            <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Book Details</h3>
              <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                {book.pages && <li><strong>Pages:</strong> {book.pages}</li>}
                {book.publisher && <li><strong>Publisher:</strong> {book.publisher}</li>}
                {book.publicationDate && <li><strong>Publication Date:</strong> {book.publicationDate}</li>}
              </ul>
            </div>
          )}

          <p className="text-base text-slate-700 dark:text-slate-400 whitespace-pre-wrap leading-relaxed">
            {book.description}
          </p>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">₹{book.price.toFixed(2)}</p>
            <button className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 text-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;

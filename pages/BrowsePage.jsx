import React, { useState, useMemo } from 'react';
import { useBooks } from '../context/BooksContext';
import { Genre } from '../types';
import BookCard from '../components/BookCard';

const BrowsePage = () => {
  const { books } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sortOrder, setSortOrder] = useState('relevance');

  const filteredBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
      const matchesPrice = book.price >= minPrice;
      const matchesRating = book.rating >= minRating;

      return matchesSearch && matchesGenre && matchesPrice && matchesRating;
    });

    const sortedBooks = [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'relevance':
        default:
          return 0; // No change in order for relevance
      }
    });

    return sortedBooks;

  }, [books, searchTerm, selectedGenre, minPrice, minRating, sortOrder]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Browse Our Collection</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Search by Title or Author
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g., The Stardust Weaver"
              className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Genre
            </label>
            <select
              id="genre"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-white"
            >
              <option value="all">All Genres</option>
              {Object.values(Genre).map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Rating
            </label>
            <select
              id="rating"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-white"
            >
              <option value="0">All Ratings</option>
              <option value="4">4 stars & up</option>
              <option value="3">3 stars & up</option>
              <option value="2">2 stars & up</option>
              <option value="1">1 star & up</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Sort by
            </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-white"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
          </div>
          <div className="lg:col-span-full">
            <label htmlFor="price" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Price Above: ₹{minPrice.toFixed(2)}
            </label>
            <input
              type="range"
              id="price"
              min="0"
              max="3000"
              step="50"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="mt-2 block w-full"
            />
          </div>
        </div>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">No Books Found</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default BrowsePage;

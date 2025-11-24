import React from 'react';
import Hero from '../components/Hero';
import BookCard from '../components/BookCard';
import { useBooks } from '../context/BooksContext';

const HomePage = () => {
  const { books } = useBooks();

  // Define collections
  const featuredBooks = books.slice(0, 4);
  const BookSection = ({ title, books }) => (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Hero />
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <BookSection title="Featured Books" books={featuredBooks} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

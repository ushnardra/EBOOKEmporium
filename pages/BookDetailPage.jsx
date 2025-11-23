import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBooks } from '../context/BooksContext';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';

const BookDetailPage = () => {
  const { id } = useParams();
  const { books, addReview } = useBooks();
  const { user } = useAuth();
  const book = books.find(b => b.id === id);

  const [isReading, setIsReading] = useState(false);
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [isPurchased, setIsPurchased] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleReadBook = () => {
    setIsReading(true);
  };

  const handleDownloadPDF = () => {
    if (book.pdfFile) {
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = book.pdfFile;
      link.download = `${book.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleBuyBook = () => {
    setShowPaymentModal(true);
  };

  const confirmPayment = () => {
    // Fake payment processing
    setTimeout(() => {
      setIsPurchased(true);
      setShowPaymentModal(false);
      alert("Payment Successful! You can now read the book.");
    }, 1500);
  };

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

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setReviewError('Please write a comment.');
      return;
    }
    
    const newReview = {
      id: Date.now().toString(),
      userName: user ? user.name : 'Anonymous Guest',
      rating: parseInt(rating),
      comment: comment,
      date: new Date().toLocaleDateString()
    };

    addReview(book.id, newReview);
    setComment('');
    setRating(4);
    setReviewError('');
  };

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

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between flex-wrap gap-4">
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {book.isFree ? 'Free' : `₹${book.price.toFixed(2)}`}
            </p>
            <div className="flex space-x-4">
              {(book.isFree || isPurchased) ? (
                <button 
                  onClick={handleReadBook}
                  className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200 text-lg"
                >
                  Read Book
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => setIsReading(true)} // Preview
                    className="bg-indigo-100 text-indigo-700 font-bold py-3 px-6 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 text-lg"
                  >
                    Preview
                  </button>
                  <button 
                    onClick={handleBuyBook}
                    className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 text-lg"
                  >
                    Pay Now
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 border-t border-slate-200 dark:border-slate-700 pt-10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Customer Reviews</h2>
        
        {/* Add Review Form */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-10">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Write a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`p-2 rounded-full focus:outline-none transition-colors ${rating >= star ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
                <span className="self-center text-sm text-slate-500 ml-2">(Max 4 stars)</span>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Comment</label>
              <textarea
                id="comment"
                rows="4"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white"
                placeholder="Share your thoughts about this book..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              {reviewError && <p className="text-red-500 text-sm mt-1">{reviewError}</p>}
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {book.reviews && book.reviews.length > 0 ? (
            book.reviews.map((review) => (
              <div key={review.id} className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg border border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-slate-800 dark:text-white">{review.userName}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{review.date}</div>
                </div>
                <div className="flex items-center mb-3">
                  <StarRating rating={review.rating} totalStars={4} />
                </div>
                <p className="text-slate-600 dark:text-slate-300">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-slate-500 dark:text-slate-400 italic">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>

      {/* Read Book Modal */}
      {isReading && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-6xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white truncate">{book.title} - Read Mode</h2>
              <div className="flex items-center space-x-4">
                {book.pdfFile && (
                  <button 
                    onClick={handleDownloadPDF}
                    className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium flex items-center transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download PDF
                  </button>
                )}
                <button 
                  onClick={() => setIsReading(false)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900 overflow-hidden relative">
              {book.pdfFile ? (
                <iframe 
                  src={book.pdfFile} 
                  className="w-full h-full border-0" 
                  title="PDF Viewer"
                />
              ) : (
                <div className="p-8 overflow-y-auto h-full bg-amber-50 dark:bg-slate-900 text-slate-800 dark:text-slate-300 font-serif text-lg leading-loose">
                  {book.content ? (
                    book.content.split('\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-4">{paragraph}</p>
                    ))
                  ) : (
                    <p className="italic text-center text-slate-500">Content not available.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Confirm Purchase</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              You are about to purchase <strong>{book.title}</strong> for <strong>₹{book.price.toFixed(2)}</strong>.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmPayment}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Pay Now (Demo)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailPage;

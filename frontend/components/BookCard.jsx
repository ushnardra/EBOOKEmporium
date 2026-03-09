import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const BookCard = ({ book }) => {
  return (
    <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        background: 'rgba(15, 15, 35, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        overflow: 'hidden',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}
      className="modern-book-card"
      >
        <style>{`
          .modern-book-card:hover {
            transform: translateY(-6px) !important;
            border-color: rgba(99, 102, 241, 0.2) !important;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(99, 102, 241, 0.08) !important;
          }
          .modern-book-card:hover .book-cover-img {
            transform: scale(1.08);
          }
          .modern-book-card:hover .book-cover-overlay {
            opacity: 1 !important;
          }
          .modern-book-card:hover .book-view-details {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          .modern-book-card:hover .book-title {
            color: #818cf8 !important;
          }
          .modern-book-card:hover .book-arrow {
            background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
          }
          .modern-book-card:hover .book-arrow svg {
            color: #ffffff !important;
          }
        `}</style>

        {/* Cover Image */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            className="book-cover-img"
            style={{
              width: '100%',
              height: '240px',
              objectFit: 'cover',
              transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'block',
            }}
          />
          <div
            className="book-cover-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(10, 10, 26, 0.8) 0%, transparent 60%)',
              opacity: 0,
              transition: 'opacity 0.5s ease',
            }}
          />
          {book.isFree && (
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              padding: '5px 14px',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: '#ffffff',
              fontSize: '0.7rem',
              fontWeight: 700,
              borderRadius: '20px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)',
            }}>
              FREE
            </div>
          )}
          <div
            className="book-view-details"
            style={{
              position: 'absolute',
              bottom: '14px',
              left: '14px',
              right: '14px',
              opacity: 0,
              transform: 'translateY(8px)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 500,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              View Details
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}>
          <h3
            className="book-title"
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#ffffff',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              transition: 'color 0.3s ease',
              marginBottom: '4px',
            }}
          >
            {book.title}
          </h3>
          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.4)',
            marginBottom: '10px',
          }}>
            by {book.author}
          </p>

          <div style={{ marginBottom: '10px' }}>
            <StarRating rating={book.rating} />
          </div>

          <span style={{
            display: 'inline-block',
            background: 'rgba(99, 102, 241, 0.1)',
            color: '#a5b4fc',
            fontSize: '0.7rem',
            fontWeight: 600,
            padding: '4px 14px',
            borderRadius: '20px',
            border: '1px solid rgba(99, 102, 241, 0.15)',
            alignSelf: 'flex-start',
            marginBottom: '12px',
            letterSpacing: '0.03em',
          }}>
            {book.genre}
          </span>

          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.35)',
            flexGrow: 1,
            marginBottom: '16px',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {book.description.substring(0, 80)}...
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '14px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            marginTop: 'auto',
          }}>
            <p style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #818cf8, #c084fc)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
            }}>
              {book.isFree ? 'Free' : `₹${book.price.toFixed(2)}`}
            </p>
            <div
              className="book-arrow"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(99, 102, 241, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(99, 102, 241, 0.15)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'color 0.3s ease' }}>
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;

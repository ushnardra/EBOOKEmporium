import React, { useState, useMemo } from 'react';
import { useBooks } from '../context/BooksContext';
import { Genre } from '../types';
import BookCard from '../components/BookCard';

const BrowsePage = () => {
  const { books } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [priceFilter, setPriceFilter] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [sortOrder, setSortOrder] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filtersOpen, setFiltersOpen] = useState(true);

  const filteredBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
      
      let matchesPriceType = true;
      if (priceFilter === 'free') {
        matchesPriceType = book.isFree;
      } else if (priceFilter === 'paid') {
        matchesPriceType = !book.isFree;
      }

      const matchesPriceValue = book.isFree || book.price >= minPrice;
      const matchesRating = book.rating >= minRating;

      return matchesSearch && matchesGenre && matchesPriceType && matchesPriceValue && matchesRating;
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
          return 0;
      }
    });

    return sortedBooks;

  }, [books, searchTerm, selectedGenre, minPrice, priceFilter, minRating, sortOrder]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('all');
    setMinPrice(0);
    setPriceFilter('all');
    setMinRating(0);
    setSortOrder('relevance');
  };

  const activeFilterCount = [
    searchTerm !== '',
    selectedGenre !== 'all',
    priceFilter !== 'all',
    minRating > 0,
    sortOrder !== 'relevance',
    minPrice > 0,
  ].filter(Boolean).length;

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#0a0a1a',
      position: 'relative',
      overflow: 'hidden',
    },
    bgOrbs: {
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    },
    orb1: {
      position: 'absolute',
      width: '500px',
      height: '500px',
      borderRadius: '50%',
      filter: 'blur(120px)',
      opacity: 0.25,
      background: 'rgba(99, 102, 241, 0.4)',
      top: '-150px',
      right: '-100px',
      animation: 'orbFloat1 15s ease-in-out infinite',
    },
    orb2: {
      position: 'absolute',
      width: '400px',
      height: '400px',
      borderRadius: '50%',
      filter: 'blur(100px)',
      opacity: 0.2,
      background: 'rgba(139, 92, 246, 0.35)',
      bottom: '-100px',
      left: '-100px',
      animation: 'orbFloat2 18s ease-in-out infinite',
    },
    orb3: {
      position: 'absolute',
      width: '250px',
      height: '250px',
      borderRadius: '50%',
      filter: 'blur(80px)',
      opacity: 0.15,
      background: 'rgba(59, 130, 246, 0.3)',
      top: '40%',
      left: '50%',
      animation: 'orbFloat3 12s ease-in-out infinite',
    },
    content: {
      position: 'relative',
      zIndex: 1,
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 24px',
    },
    heroSection: {
      textAlign: 'center',
      marginBottom: '40px',
      animation: 'fadeInUp 0.6s ease-out',
    },
    heroTitle: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 800,
      color: '#ffffff',
      letterSpacing: '-0.03em',
      marginBottom: '12px',
      lineHeight: 1.1,
    },
    heroGradient: {
      background: 'linear-gradient(135deg, #818cf8, #c084fc, #f472b6)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    heroSubtitle: {
      fontSize: '1.1rem',
      color: 'rgba(255, 255, 255, 0.45)',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: 1.6,
    },
    searchSection: {
      marginBottom: '32px',
      animation: 'fadeInUp 0.6s ease-out 0.1s both',
    },
    searchBar: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: 'rgba(15, 15, 35, 0.6)',
      backdropFilter: 'blur(40px)',
      WebkitBackdropFilter: 'blur(40px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '20px',
      padding: '8px 16px',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
    },
    searchIcon: {
      color: 'rgba(255, 255, 255, 0.35)',
      flexShrink: 0,
    },
    searchInput: {
      flex: 1,
      background: 'none',
      border: 'none',
      outline: 'none',
      color: '#ffffff',
      fontSize: '1rem',
      fontFamily: "'Inter', sans-serif",
      padding: '10px 0',
    },
    searchStats: {
      color: 'rgba(255, 255, 255, 0.3)',
      fontSize: '0.85rem',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    },
    filterToggle: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: activeFilterCount > 0 ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
      border: `1px solid ${activeFilterCount > 0 ? 'rgba(99, 102, 241, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
      borderRadius: '14px',
      padding: '10px 18px',
      color: activeFilterCount > 0 ? '#818cf8' : 'rgba(255, 255, 255, 0.6)',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 500,
      fontFamily: "'Inter', sans-serif",
      transition: 'all 0.3s ease',
      flexShrink: 0,
    },
    filterBadge: {
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      color: '#fff',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.7rem',
      fontWeight: 700,
    },
    filtersPanel: {
      background: 'rgba(15, 15, 35, 0.5)',
      backdropFilter: 'blur(40px)',
      WebkitBackdropFilter: 'blur(40px)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderRadius: '20px',
      padding: filtersOpen ? '28px' : '0',
      marginTop: '16px',
      maxHeight: filtersOpen ? '400px' : '0',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      opacity: filtersOpen ? 1 : 0,
    },
    filtersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '20px',
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    filterLabel: {
      fontSize: '0.8rem',
      fontWeight: 600,
      color: 'rgba(255, 255, 255, 0.45)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
    filterSelect: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '12px',
      padding: '11px 14px',
      color: '#ffffff',
      fontSize: '0.9rem',
      fontFamily: "'Inter', sans-serif",
      outline: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 14px center',
      paddingRight: '36px',
    },
    priceSlider: {
      width: '100%',
      accentColor: '#818cf8',
      cursor: 'pointer',
    },
    clearBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.2)',
      borderRadius: '12px',
      padding: '10px 18px',
      color: '#fca5a5',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontWeight: 500,
      fontFamily: "'Inter', sans-serif",
      transition: 'all 0.3s ease',
      marginTop: 'auto',
      alignSelf: 'flex-end',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '28px',
      animation: 'fadeInUp 0.6s ease-out 0.2s both',
    },
    resultCount: {
      fontSize: '0.95rem',
      color: 'rgba(255, 255, 255, 0.5)',
    },
    resultHighlight: {
      color: '#818cf8',
      fontWeight: 600,
    },
    viewToggle: {
      display: 'flex',
      gap: '4px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      padding: '4px',
    },
    viewBtn: (active) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '36px',
      height: '36px',
      borderRadius: '10px',
      border: 'none',
      background: active ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
      color: active ? '#818cf8' : 'rgba(255, 255, 255, 0.35)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }),
    booksGrid: {
      display: 'grid',
      gridTemplateColumns: viewMode === 'grid'
        ? 'repeat(auto-fill, minmax(260px, 1fr))'
        : '1fr',
      gap: viewMode === 'grid' ? '28px' : '16px',
      animation: 'fadeInUp 0.6s ease-out 0.3s both',
    },
    emptyState: {
      textAlign: 'center',
      padding: '80px 20px',
      animation: 'fadeInUp 0.6s ease-out',
    },
    emptyIcon: {
      width: '80px',
      height: '80px',
      margin: '0 auto 24px',
      background: 'rgba(99, 102, 241, 0.1)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyTitle: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#ffffff',
      marginBottom: '8px',
    },
    emptyText: {
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: '1rem',
      maxWidth: '400px',
      margin: '0 auto',
    },
  };

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, 40px); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(-50%, -50%); }
          50% { transform: translate(-40%, -60%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .browse-search-bar:focus-within {
          border-color: rgba(99, 102, 241, 0.4) !important;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08), 0 4px 30px rgba(0, 0, 0, 0.3) !important;
        }
        .browse-filter-select:focus {
          border-color: rgba(99, 102, 241, 0.4);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        .browse-filter-select option {
          background: #1a1a2e;
          color: #ffffff;
        }
        .browse-filter-toggle:hover {
          background: rgba(99, 102, 241, 0.15) !important;
          border-color: rgba(99, 102, 241, 0.3) !important;
          color: #818cf8 !important;
        }
        .browse-clear-btn:hover {
          background: rgba(239, 68, 68, 0.2) !important;
          border-color: rgba(239, 68, 68, 0.4) !important;
        }
        .browse-view-btn:hover {
          background: rgba(99, 102, 241, 0.12) !important;
          color: #818cf8 !important;
        }
        input[type="range"] {
          -webkit-appearance: none;
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.08);
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
          transition: transform 0.2s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .book-card-animate {
          animation: fadeInUp 0.5s ease-out both;
        }
      `}</style>

      {/* Background Orbs */}
      <div style={styles.bgOrbs}>
        <div style={styles.orb1}></div>
        <div style={styles.orb2}></div>
        <div style={styles.orb3}></div>
      </div>

      <div style={styles.content}>
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <h1 style={styles.heroTitle}>
            Browse Our <span style={styles.heroGradient}>Collection</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Discover thousands of ebooks across every genre. Find your next favorite read today.
          </p>
        </div>

        {/* Search Bar */}
        <div style={styles.searchSection}>
          <div style={styles.searchBar} className="browse-search-bar">
            <svg style={styles.searchIcon} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, author, or keyword..."
              style={styles.searchInput}
            />
            <span style={styles.searchStats}>{filteredBooks.length} books</span>
            <button
              style={styles.filterToggle}
              className="browse-filter-toggle"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span style={styles.filterBadge}>{activeFilterCount}</span>
              )}
            </button>
          </div>

          {/* Filters Panel */}
          <div style={styles.filtersPanel}>
            <div style={styles.filtersGrid}>
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Genre</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  style={styles.filterSelect}
                  className="browse-filter-select"
                >
                  <option value="all">All Genres</option>
                  {Object.values(Genre).map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Price Type</label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  style={styles.filterSelect}
                  className="browse-filter-select"
                >
                  <option value="all">All</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Min Rating</label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  style={styles.filterSelect}
                  className="browse-filter-select"
                >
                  <option value="0">All Ratings</option>
                  <option value="4">4 Stars & Up</option>
                  <option value="3">3 Stars & Up</option>
                  <option value="2">2 Stars & Up</option>
                  <option value="1">1 Star & Up</option>
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Sort By</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  style={styles.filterSelect}
                  className="browse-filter-select"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="rating-desc">Highest Rated</option>
                </select>
              </div>

              {priceFilter !== 'free' && (
                <div style={styles.filterGroup}>
                  <label style={styles.filterLabel}>
                    Min Price: ₹{minPrice}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="50"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    style={{ ...styles.priceSlider, marginTop: '8px' }}
                  />
                </div>
              )}

              {activeFilterCount > 0 && (
                <div style={styles.filterGroup}>
                  <label style={{ ...styles.filterLabel, opacity: 0 }}>Clear</label>
                  <button
                    style={styles.clearBtn}
                    className="browse-clear-btn"
                    onClick={clearFilters}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                    </svg>
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div style={styles.toolbar}>
          <p style={styles.resultCount}>
            Showing <span style={styles.resultHighlight}>{filteredBooks.length}</span> {filteredBooks.length === 1 ? 'book' : 'books'}
          </p>
          <div style={styles.viewToggle}>
            <button
              style={styles.viewBtn(viewMode === 'grid')}
              className="browse-view-btn"
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
              </svg>
            </button>
            <button
              style={styles.viewBtn(viewMode === 'list')}
              className="browse-view-btn"
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div style={styles.booksGrid}>
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="book-card-animate"
                style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                <path d="m9 10 2 2 4-4"/>
              </svg>
            </div>
            <h2 style={styles.emptyTitle}>No Books Found</h2>
            <p style={styles.emptyText}>
              Try adjusting your filters or search query to discover more books in our collection.
            </p>
            {activeFilterCount > 0 && (
              <button
                style={{
                  ...styles.clearBtn,
                  margin: '24px auto 0',
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  color: '#818cf8',
                }}
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;

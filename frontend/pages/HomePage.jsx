import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import BookCard from '../components/BookCard';
import { useBooks } from '../context/BooksContext';

/* Animated Counter Component */
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* Genre/Category Card */
const CategoryCard = ({ icon, title, count, color, gradient }) => (
  <Link
    to="/browse"
    className="group block relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl"
    style={{ background: gradient }}
  >
    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-white/70">{count} Books</p>
    </div>
    <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-700"></div>
  </Link>
);

/* Testimonial Card */
const TestimonialCard = ({ name, role, text, avatar, rating }) => (
  <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-100 dark:border-slate-700/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 hover:-translate-y-1">
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-slate-200 dark:text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">"{text}"</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white" style={{ background: `linear-gradient(135deg, ${avatar})` }}>
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-slate-800 dark:text-white">{name}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{role}</p>
      </div>
    </div>
  </div>
);

/* Feature Card */
const FeatureCard = ({ icon, title, description }) => (
  <div className="group text-center p-8 rounded-2xl bg-white dark:bg-slate-800/40 backdrop-blur-sm border border-slate-100 dark:border-slate-700/30 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-2">
    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const HomePage = () => {
  const { books } = useBooks();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featuredBooks = books.slice(0, 4);
  const trendingBooks = books.slice(4, 8);
  const freeBooks = books.filter(b => b.isFree).slice(0, 4);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const BookSection = ({ title, subtitle, books, viewAllLink }) => (
    <div className="mb-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{title}</h2>
          {subtitle && <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">{subtitle}</p>}
        </div>
        {viewAllLink && (
          <Link to={viewAllLink} className="hidden md:flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all duration-300">
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );

  const categories = [
    { icon: '🧙‍♂️', title: 'Fantasy', count: '3,200+', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
    { icon: '🚀', title: 'Sci-Fi', count: '2,100+', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
    { icon: '🔍', title: 'Mystery', count: '1,800+', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
    { icon: '❤️', title: 'Romance', count: '2,500+', gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)' },
    { icon: '📚', title: 'Non-Fiction', count: '4,100+', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
    { icon: '👻', title: 'Horror', count: '900+', gradient: 'linear-gradient(135deg, #374151, #111827)' },
  ];

  const testimonials = [
    { name: 'Sarah Anderson', role: 'Avid Reader', text: 'Ebook Emporium completely changed how I discover new books. The collection is incredible and the reading experience is seamless!', avatar: '#6366f1, #8b5cf6', rating: 5 },
    { name: 'Michael Chen', role: 'Published Author', text: 'As an indie author, this platform gave me the exposure I needed. My books reached readers I never thought possible. Truly life-changing!', avatar: '#06b6d4, #3b82f6', rating: 5 },
    { name: 'Emily Rodriguez', role: 'Book Club Leader', text: 'Our book club discovered so many hidden gems here. The review system helps us pick our next read every time. Highly recommended!', avatar: '#ec4899, #f43f5e', rating: 4 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Hero />

      {/* Stats Section */}
      <div className="relative py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNCAyaC00djJoNHYtMnptLTYgMGgtNHYyaDR2LTJ6bTIwLTJ2LTRoLTJ2NGgyem0wIDZ2LTRoLTJ2NGgyem0tNCAyaC00djJoNHYtMnptLTYgMGgtNHYyaDR2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                <AnimatedCounter end={10000} suffix="+" />
              </p>
              <p className="text-indigo-200 font-medium">Ebooks Available</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                <AnimatedCounter end={50000} suffix="+" />
              </p>
              <p className="text-indigo-200 font-medium">Happy Readers</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                <AnimatedCounter end={2500} suffix="+" />
              </p>
              <p className="text-indigo-200 font-medium">Authors</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                <AnimatedCounter end={15} suffix="+" />
              </p>
              <p className="text-indigo-200 font-medium">Genres</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Books */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <BookSection title="Featured Books" subtitle="Handpicked by our editorial team" books={featuredBooks} viewAllLink="/browse" />
        </div>
      </div>

      {/* Browse by Category */}
      <div className="py-20 bg-white dark:bg-slate-800/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Browse by Category</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg max-w-2xl mx-auto">Explore our vast collection organized by your favorite genres</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.title} {...cat} />
            ))}
          </div>
        </div>
      </div>

      {/* Trending Now */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <BookSection title="Trending Now 🔥" subtitle="What everyone's reading this week" books={trendingBooks} viewAllLink="/browse" />
        </div>
      </div>

      {/* Why Choose Us / Features */}
      <div className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800/30 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Why Ebook Emporium?</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg max-w-2xl mx-auto">Everything you need for your digital reading journey, all in one place.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<svg className="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>}
              title="Vast Library"
              description="Access over 10,000 titles across 15+ genres, from bestsellers to indie gems."
            />
            <FeatureCard
              icon={<svg className="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>}
              title="Easy Publishing"
              description="Authors can publish and sell their books with our simple upload process."
            />
            <FeatureCard
              icon={<svg className="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
              title="Secure Platform"
              description="Your purchases, personal data, and reading history are always safe and encrypted."
            />
            <FeatureCard
              icon={<svg className="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>}
              title="Built-in Reader"
              description="Read directly in your browser with our beautiful, distraction-free reader."
            />
          </div>
        </div>
      </div>

      {/* Free Books */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <BookSection title="Free Books 📖" subtitle="Start reading without spending a penny" books={freeBooks} viewAllLink="/browse" />
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Loved by Readers</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg max-w-2xl mx-auto">See what our community has to say about their experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA / Publish Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-12 md:p-16">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.15) 0%, transparent 50%)`
              }}></div>
            </div>
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Ready to Share Your Story?
              </h2>
              <p className="text-xl text-white/80 mb-10 leading-relaxed">
                Join thousands of authors who have published their work on Ebook Emporium. Upload your book today and reach readers worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/sell" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
                  </svg>
                  Publish Your Book
                </Link>
                <Link to="/browse" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                  Browse Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-20 bg-white dark:bg-slate-800/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">Stay in the Loop</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-8">Get notified about new releases, exclusive deals, and reading recommendations delivered to your inbox.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 whitespace-nowrap"
              >
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
            <p className="text-xs text-slate-400 mt-4">No spam, unsubscribe at any time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

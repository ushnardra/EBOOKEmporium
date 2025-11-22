import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const linkClasses = "text-slate-500 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium";
    const activeLinkClasses = "text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-slate-800";
    
    const navLink = ({ isActive }) => isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses;

    return (
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                            <BookIcon />
                            <span className="font-bold text-xl">Ebook Emporium</span>
                        </NavLink>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink to="/" className={navLink}>Home</NavLink>
                            <NavLink to="/browse" className={navLink}>Browse Books</NavLink>
                            <NavLink to="/sell" className={navLink}>Sell a Book</NavLink>
                            <NavLink to="/about" className={navLink}>About</NavLink>
                            {user ? (
                                <div className="flex items-center gap-4 ml-4">
                                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                        Hi, {user.name}
                                    </span>
                                    <button 
                                        onClick={logout}
                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 ml-4">
                                    <NavLink to="/login" className={navLink}>Login</NavLink>
                                    <NavLink 
                                        to="/signup" 
                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                    >
                                        Sign Up
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 dark:text-slate-300 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to="/" className={navLink} onClick={()=> setIsMenuOpen(false)}>Home</NavLink>
                        <NavLink to="/browse" className={navLink} onClick={()=> setIsMenuOpen(false)}>Browse Books</NavLink>
                        <NavLink to="/sell" className={navLink} onClick={()=> setIsMenuOpen(false)}>Sell a Book</NavLink>
                        <NavLink to="/about" className={navLink} onClick={()=> setIsMenuOpen(false)}>About</NavLink>
                        {user ? (
                            <>
                                <div className="px-3 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                    Hi, {user.name}
                                </div>
                                <button 
                                    onClick={() => { logout(); setIsMenuOpen(false); }}
                                    className="w-full text-left px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className={navLink} onClick={()=> setIsMenuOpen(false)}>Login</NavLink>
                                <NavLink to="/signup" className={navLink} onClick={()=> setIsMenuOpen(false)}>Sign Up</NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;

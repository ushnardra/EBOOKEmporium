import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    © {new Date().getFullYear()} Ebook Emporium. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

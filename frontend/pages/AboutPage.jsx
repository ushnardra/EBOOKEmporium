import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-slate-900 dark:text-white tracking-tight sm:text-5xl">About Ebook Emporium</h1>
          <p className="mt-6 text-xl text-slate-600 dark:text-slate-300 text-center">
            Your Digital Library, Reimagined.
          </p>

          <div className="mt-12 text-slate-700 dark:text-slate-400 space-y-6">
            <p>
              Ebook Emporium was founded on a simple yet powerful idea: to create a seamless and inspiring space for both readers and authors in the digital age. We believe that stories have the power to connect us, to broaden our horizons, and to spark our imaginations. Our mission is to make those stories more accessible than ever before.
            </p>
            <p>
              For readers, we offer a carefully curated yet expansive collection of ebooks across every genre imaginable. From epic fantasies and mind-bending science fiction to heartwarming romances and insightful non-fiction, our library is constantly growing. Our intuitive platform makes it easy to discover your next favorite book, with powerful search and filtering tools to guide you to the perfect read.
            </p>
            <p>
              For authors, we provide a platform to share your voice with the world. We've simplified the publishing process, empowering writers to bring their creations to a global audience without the traditional barriers. At Ebook Emporium, you're not just publishing a book; you're joining a vibrant community of storytellers.
            </p>
            <p>
              Thank you for being a part of our journey. Whether you're here to read, to write, or simply to explore, we're glad to have you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

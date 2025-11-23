import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Genre } from '../types';

const SellPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState(Genre.FANTASY);
  const [price, setPrice] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null); // File object
  const [pdfFile, setPdfFile] = useState(null); // File object
  const [imagePreview, setImagePreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { token } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || (!isFree && !price) || !description || !coverImage || !pdfFile) {
      alert('Please fill out all fields and upload both cover image and PDF.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('description', description);
    formData.append('price', isFree ? 0 : price);
    formData.append('is_free', isFree ? 'True' : 'False'); // Send as string for Django boolean field if needed, or just boolean
    formData.append('cover_image', coverImage);
    formData.append('pdf_file', pdfFile);

    try {
      const headers = {};
      if (token) {
        headers['Authorization'] = `Token ${token}`;
      }

      console.log('Uploading book to backend...');
      const response = await fetch('http://127.0.0.1:8000/api/books/', {
        method: 'POST',
        headers: headers,
        body: formData,
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Book uploaded successfully:', data);
        // Reset form and show success message
        setTitle('');
        setAuthor('');
        setGenre(Genre.FANTASY);
        setPrice('');
        setIsFree(false);
        setDescription('');
        setCoverImage(null);
        setPdfFile(null);
        setImagePreview(null);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        // Book will appear automatically when refreshed from API
        // No need to call addBook here as it causes duplicates 
      } else {
        let errorMessage = `Server returned status ${response.status}`;
        try {
          const errorData = await response.json();
          console.error('Failed to upload book:', errorData);
          errorMessage = JSON.stringify(errorData, null, 2);
        } catch (e) {
          const errorText = await response.text();
          console.error('Failed to upload book (text):', errorText);
          errorMessage = errorText;
        }
        alert('Failed to upload book:\n' + errorMessage);
      }
    } catch (error) {
      console.error('Error uploading book:', error);
      alert('Error uploading book: ' + error.message + '\n\nMake sure the backend server is running on http://127.0.0.1:8000');
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">Upload Your Book</h1>

        {submitted && (
          <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Your book has been published.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Book Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="cover-image" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Cover Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Cover preview" className="mx-auto h-48 w-auto rounded-md" />
                ) : (
                  <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <div className="flex text-sm text-slate-600 dark:text-slate-400">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-slate-700 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-800 focus-within:ring-indigo-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} required />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Author Name
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Genre
              </label>
              <select
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-white"
              >
                {Object.values(Genre).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="isFree"
                  checked={isFree}
                  onChange={(e) => setIsFree(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isFree" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                  Free to Read?
                </label>
              </div>
              {!isFree && (
                <>
                  <label htmlFor="price" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    required={!isFree}
                    className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-white"
                  />
                </>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="pdf-upload" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Upload PDF Book
            </label>
            <input
              type="file"
              id="pdf-upload"
              accept=".pdf"
              onChange={handlePdfChange}
              required
              className="mt-1 block w-full text-sm text-slate-500 dark:text-slate-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-700 dark:text-white"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 dark:disabled:bg-indigo-800"
              disabled={!title || !author || (!isFree && !price) || !description || !coverImage || !pdfFile}
            >
              Publish Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellPage;

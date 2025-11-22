import React, { createContext, useState, useContext } from 'react';
import { Genre } from '../types';

import book1 from '../assets/images/book-1.jpg';
import book2 from '../assets/images/book-2.jpg';
import book3 from '../assets/images/book-3.jpg';
import book4 from '../assets/images/book-4.jpg';
import book5 from '../assets/images/book-5.jpg';
import book6 from '../assets/images/book-6.jpg';
import book7 from '../assets/images/book-7.jpg';
import book8 from '../assets/images/book-8.jpg';
import book9 from '../assets/images/book-9.jpg';
import book10 from '../assets/images/book-10.jpg';
import book11 from '../assets/images/book-11.jpg';
import book12 from '../assets/images/book-12.jpg';
import book13 from '../assets/images/book-13.jpg';
import book14 from '../assets/images/book-14.jpg';
import book15 from '../assets/images/book-15.jpg';
import book16 from '../assets/images/book-16.jpg';
import book17 from '../assets/images/book-17.jpg';
import book18 from '../assets/images/book-18.jpg';
import book19 from '../assets/images/book-19.jpg';
import book20 from '../assets/images/book-20.jpg';

const BooksContext = createContext(undefined);

const initialBooks = [
  {
    id: '1',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: Genre.FANTASY,
    price: 1199,
    coverImage: book1,
    description: 'Bilbo Baggins, a hobbit, is swept into an epic quest to reclaim the lost Kingdom of Erebor from the fearsome dragon Smaug.',
    rating: 4.8,
    pages: 310,
    publisher: 'Houghton Mifflin Harcourt',
    publicationDate: '2012-09-18',
  },
  {
    id: '2',
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    genre: Genre.FANTASY,
    price: 999,
    coverImage: book2,
    description: 'A young boy discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.',
    rating: 4.9,
    pages: 309,
    publisher: 'Scholastic',
    publicationDate: '1998-09-01',
  },
  {
    id: '3',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: Genre.SCIENCE_FICTION,
    price: 1299,
    coverImage: book3,
    description: 'Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe.',
    rating: 4.7,
    pages: 412,
    publisher: 'Ace',
    publicationDate: '2005-08-02',
  },
  {
    id: '4',
    title: "Ender's Game",
    author: 'Orson Scott Card',
    genre: Genre.SCIENCE_FICTION,
    price: 899,
    coverImage: book4,
    description: 'Young Ender Wiggin is recruited by the International Military to lead the fight against the Formics, an insectoid alien race.',
    rating: 4.6,
    pages: 324,
    publisher: 'Tor Science Fiction',
    publicationDate: '1994-07-15',
  },
  {
    id: '5',
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    genre: Genre.MYSTERY,
    price: 799,
    coverImage: book5,
    description: "Journalist Mikael Blomkvist and hacker Lisbeth Salander investigate the disappearance of a wealthy patriarch's niece from 40 years ago.",
    rating: 4.4,
    pages: 672,
    publisher: 'Vintage Crime/Black Lizard',
    publicationDate: '2011-06-14',
  },
  {
    id: '6',
    title: 'And Then There Were None',
    author: 'Agatha Christie',
    genre: Genre.MYSTERY,
    price: 699,
    coverImage: book6,
    description: 'Ten strangers are invited to an isolated island by a mysterious host, and one by one, they start dying.',
    rating: 4.8,
    pages: 264,
    publisher: 'William Morrow Paperbacks',
    publicationDate: '2011-03-29',
  },
  {
    id: '7',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: Genre.ROMANCE,
    price: 499,
    coverImage: book7,
    description: 'Elizabeth Bennet navigates the societal pressures of 19th-century England while dealing with the proud Mr. Darcy.',
    rating: 4.6,
    pages: 480,
    publisher: 'Penguin Classics',
    publicationDate: '2002-12-31',
  },
  {
    id: '8',
    title: 'The Notebook',
    author: 'Nicholas Sparks',
    genre: Genre.ROMANCE,
    price: 750,
    coverImage: book8,
    description: 'An elderly man reads to a woman with dementia from a notebook, telling the story of two young lovers separated by war and class.',
    rating: 4.5,
    pages: 214,
    publisher: 'Warner Books',
    publicationDate: '1999-07-01',
  },
  {
    id: '9',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    genre: Genre.THRILLER,
    price: 850,
    coverImage: book9,
    description: 'Symbologist Robert Langdon and cryptologist Sophie Neveu investigate a murder in the Louvre and uncover a religious mystery.',
    rating: 3.9,
    pages: 480,
    publisher: 'Anchor',
    publicationDate: '2009-03-31',
  },
  {
    id: '10',
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    genre: Genre.THRILLER,
    price: 950,
    coverImage: book10,
    description: 'On his fifth wedding anniversary, Nick Dunne reports that his beautiful wife, Amy, has gone missing.',
    rating: 4.1,
    pages: 432,
    publisher: 'Crown',
    publicationDate: '2014-04-22',
  },
  {
    id: '11',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    genre: Genre.NON_FICTION,
    price: 1499,
    coverImage: book11,
    description: 'A survey of the history of humankind from the Stone Age to the twenty-first century.',
    rating: 4.7,
    pages: 464,
    publisher: 'Harper',
    publicationDate: '2015-02-10',
  },
  {
    id: '12',
    title: 'Educated',
    author: 'Tara Westover',
    genre: Genre.NON_FICTION,
    price: 1150,
    coverImage: book12,
    description: 'A memoir about a young woman who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
    rating: 4.8,
    pages: 352,
    publisher: 'Random House',
    publicationDate: '2018-02-20',
  },
  {
    id: '13',
    title: 'It',
    author: 'Stephen King',
    genre: Genre.HORROR,
    price: 1599,
    coverImage: book13,
    description: 'Seven adults return to their hometown to confront a shape-shifting evil that terrorized them as teenagers.',
    rating: 4.5,
    pages: 1168,
    publisher: 'Scribner',
    publicationDate: '2016-01-01',
  },
  {
    id: '14',
    title: 'Dracula',
    author: 'Bram Stoker',
    genre: Genre.HORROR,
    price: 550,
    coverImage: book14,
    description: 'The vampire Count Dracula attempts to move from Transylvania to England so that he may find new blood and spread his undead curse.',
    rating: 4.4,
    pages: 432,
    publisher: 'Dover Publications',
    publicationDate: '2000-06-23',
  },
  {
    id: '15',
    title: 'Where the Wild Things Are',
    author: 'Maurice Sendak',
    genre: Genre.CHILDREN,
    price: 1450,
    coverImage: book15,
    description: 'Max, a young boy dressed in a wolf suit, sails to an island inhabited by the Wild Things, who declare him king.',
    rating: 4.9,
    pages: 48,
    publisher: 'HarperCollins',
    publicationDate: '2012-12-26',
  },
  {
    id: '16',
    title: "Charlotte's Web",
    author: 'E.B. White',
    genre: Genre.CHILDREN,
    price: 650,
    coverImage: book16,
    description: 'A pig named Wilbur is saved from slaughter by a spider named Charlotte, who writes messages in her web.',
    rating: 4.8,
    pages: 192,
    publisher: 'HarperCollins',
    publicationDate: '2006-05-09',
  },
  {
    id: '17',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    genre: Genre.BIOGRAPHY,
    price: 1600,
    coverImage: book17,
    description: 'The exclusive biography of Steve Jobs, based on more than forty interviews with Jobs conducted over two years.',
    rating: 4.6,
    pages: 656,
    publisher: 'Simon & Schuster',
    publicationDate: '2011-10-24',
  },
  {
    id: '18',
    title: 'Becoming',
    author: 'Michelle Obama',
    genre: Genre.BIOGRAPHY,
    price: 1350,
    coverImage: book18,
    description: 'A memoir by the former First Lady of the United States, describing her roots and how she found her voice.',
    rating: 4.9,
    pages: 448,
    publisher: 'Crown',
    publicationDate: '2018-11-13',
  },
  {
    id: '19',
    title: 'Guns, Germs, and Steel',
    author: 'Jared Diamond',
    genre: Genre.HISTORY,
    price: 1250,
    coverImage: book19,
    description: 'A trans-disciplinary non-fiction book that attempts to explain why Eurasian civilizations have survived and conquered others.',
    rating: 4.3,
    pages: 480,
    publisher: 'W. W. Norton & Company',
    publicationDate: '1999-04-01',
  },
  {
    id: '20',
    title: 'The Diary of a Young Girl',
    author: 'Anne Frank',
    genre: Genre.HISTORY,
    price: 599,
    coverImage: book20,
    description: 'The writings from the Dutch-language diary kept by Anne Frank while she was in hiding for two years with her family during the Nazi occupation of the Netherlands.',
    rating: 4.8,
    pages: 304,
    publisher: 'Bantam',
    publicationDate: '1993-06-01',
  },
];

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState(initialBooks);

  const addBook = (bookData) => {
    const newBook = {
      ...bookData,
      id: new Date().toISOString(),
      rating: 0, // New books are unrated initially
    };
    setBooks(prevBooks => [newBook, ...prevBooks]);
  };

  return (
    <BooksContext.Provider value={{ books, addBook }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
};

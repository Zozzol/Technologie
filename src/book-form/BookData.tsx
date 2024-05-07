import React from 'react';

export interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  yearOfPublish: number;
}

// Function to create a book object
function createBook(
  id: number,
  isbn: string,
  title: string,
  author: string,
  publisher: string,
  yearOfPublish: number,
): Book {
  return { id, isbn, title, author, publisher, yearOfPublish };
}

export function BookData(): Book[] {
  return [
    createBook(
      1,
      '978-1-86092-000-1',
      'Animal Farm',
      'George Orwell',
      'Secker & Warburg',
      1945,
    ),
    createBook(
      2,
      '978-1-86092-010-0',
      'Brave New World',
      'Aldous Huxley',
      'Chatto & Windus',
      1932,
    ),
    createBook(
      3,
      '978-1-86092-022-3',
      '1984',
      'George Orwell',
      'Secker & Warburg',
      1949,
    ),
    createBook(
      4,
      '978-1-86092-035-3',
      'To Kill a Mockingbird',
      'Harper Lee',
      'J. B. Lippincott & Co.',
      1960,
    ),
    createBook(
      5,
      '978-1-86092-045-2',
      'The Great Gatsby',
      'F. Scott Fitzgerald',
      "Charles Scribner's Sons",
      1925,
    ),
  ];
}

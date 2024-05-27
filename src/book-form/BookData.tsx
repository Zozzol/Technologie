export interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  yearOfPublish: number;
}

export interface RentedBookInfo {
  isAvailable: boolean;
  rentedDate?: Date;
  returnDate?: Date;
  rentedBy?: string;
}

export interface ExtendedBook extends Book {
  rentalInfo?: RentedBookInfo;
}

function createBook(
  id: number,
  isbn: string,
  title: string,
  author: string,
  publisher: string,
  yearOfPublish: number,
  rentalInfo?: RentedBookInfo,
): ExtendedBook {
  return { id, isbn, title, author, publisher, yearOfPublish, rentalInfo };
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
      {
        isAvailable: false,
        rentedDate: new Date('2023-05-01'),
        returnDate: new Date('2023-05-15'),
        rentedBy: 'Alice',
      },
    ),
    createBook(
      2,
      '978-1-86092-010-0',
      'Brave New World',
      'Aldous Huxley',
      'Chatto & Windus',
      1932,
      { isAvailable: true },
    ),
    createBook(
      3,
      '978-1-86092-022-3',
      '1984',
      'George Orwell',
      'Secker & Warburg',
      1949,
      {
        isAvailable: false,
        rentedDate: new Date('2023-04-10'),
        returnDate: new Date('2023-04-24'),
        rentedBy: 'Bob',
      },
    ),
    createBook(
      4,
      '978-1-86092-035-3',
      'To Kill a Mockingbird',
      'Harper Lee',
      'J. B. Lippincott & Co.',
      1960,
      {
        isAvailable: true,
      },
    ),
    createBook(
      5,
      '978-1-86092-045-2',
      'The Great Gatsby',
      'F. Scott Fitzgerald',
      "Charles Scribner's Sons",
      1925,
      {
        isAvailable: false,
        rentedDate: new Date('2023-03-01'),
        returnDate: new Date('2023-03-15'),
        rentedBy: 'Charlie',
      },
    ),
    createBook(
      6,
      '978-1-86092-055-1',
      'Moby Dick',
      'Herman Melville',
      'Richard Bentley',
      1851,
      {
        isAvailable: false,
        rentedDate: new Date('2023-04-10'),
        returnDate: new Date('2023-04-24'),
        rentedBy: 'Bob',
      },
    ),
    createBook(
      7,
      '978-1-86092-065-0',
      'Pride and Prejudice',
      'Jane Austen',
      'T. Egerton',
      1813,
      {
        isAvailable: true,
      },
    ),
    createBook(
      8,
      '978-1-86092-075-9',
      'War and Peace',
      'Leo Tolstoy',
      'The Russian Messenger',
      1869,
      {
        isAvailable: false,
        rentedDate: new Date('2023-04-01'),
        returnDate: new Date('2023-04-15'),
        rentedBy: 'Dave',
      },
    ),
    createBook(
      9,
      '978-1-86092-085-8',
      'The Catcher in the Rye',
      'J.D. Salinger',
      'Little, Brown and Company',
      1951,
      {
        isAvailable: true,
      },
    ),
    createBook(
      10,
      '978-1-86092-095-7',
      'Don Quixote',
      'Miguel de Cervantes',
      'Francisco de Robles',
      1605,
      {
        isAvailable: true,
      },
    ),
    createBook(
      11,
      '978-1-86092-105-4',
      'Beloved',
      'Toni Morrison',
      'Alfred A. Knopf',
      1987,
      {
        isAvailable: false,
        rentedDate: new Date('2023-02-10'),
        returnDate: new Date('2023-02-24'),
        rentedBy: 'Emma',
      },
    ),
    createBook(
      12,
      '978-1-86092-115-3',
      'Lord of the Flies',
      'William Golding',
      'Faber and Faber',
      1954,
      {
        isAvailable: true,
      },
    ),
    createBook(
      13,
      '978-1-86092-125-2',
      'The Hobbit',
      'J.R.R. Tolkien',
      'George Allen & Unwin',
      1937,
      {
        isAvailable: false,
        rentedDate: new Date('2023-01-05'),
        returnDate: new Date('2023-01-20'),
        rentedBy: 'Frank',
      },
    ),
    createBook(
      14,
      '978-1-86092-135-1',
      'Fahrenheit 451',
      'Ray Bradbury',
      'Ballantine Books',
      1953,
      {
        isAvailable: true,
      },
    ),
    createBook(
      15,
      '978-1-86092-145-0',
      'Crime and Punishment',
      'Fyodor Dostoevsky',
      'The Russian Messenger',
      1866,
      {
        isAvailable: false,
        rentedDate: new Date('2023-03-15'),
        returnDate: new Date('2023-03-30'),
        rentedBy: 'Grace',
      },
    ),
  ];
}

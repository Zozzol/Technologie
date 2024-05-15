// BookRented.tsx
import React from 'react';
import { ExtendedBook, BookData } from './BookData';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import MenuAppBar from '../app-bar/MenuAppBar';

const BookRented: React.FC = () => {
  const [books] = React.useState<ExtendedBook[]>(BookData());
  const rentedBooks = books.filter(
    (book) => book.rentalInfo && !book.rentalInfo.isAvailable,
  );

  return (
    <>
      <MenuAppBar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Title</strong>
              </TableCell>
              <TableCell>
                <strong>Rented By</strong>
              </TableCell>
              <TableCell>
                <strong>Rented Date</strong>
              </TableCell>
              <TableCell>
                <strong>Return Date</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rentedBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.rentalInfo?.rentedBy}</TableCell>
                <TableCell>
                  {book.rentalInfo?.rentedDate?.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {book.rentalInfo?.returnDate?.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BookRented;

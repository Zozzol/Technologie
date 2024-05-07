import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { Book } from './BookData';

interface BookViewProps {
  book: Book;
}

const BookView: React.FC<BookViewProps> = ({ book }) => {
  return (
    <TableRow
      key={book.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {book.id}
      </TableCell>
      <TableCell align="right">{book.title}</TableCell>
      <TableCell align="right">{book.author}</TableCell>
      <TableCell align="right">{book.isbn}</TableCell>
      <TableCell align="right">{book.publisher}</TableCell>
      <TableCell align="right">{book.yearOfPublish}</TableCell>
    </TableRow>
  );
};

export default BookView;

// BookTable.tsx
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
  IconButton,
  TextField,
} from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuAppBar from '../app-bar/MenuAppBar';
import { Bookmark } from '@mui/icons-material';

const BookTable: React.FC = () => {
  const [books, setBooks] = React.useState<ExtendedBook[]>(BookData());
  const [searchText, setSearchText] = React.useState('');

  const toggleBookAvailability = (id: number) => {
    setBooks(
      books.map((book) => {
        if (book.id === id) {
          const newStatus = book.rentalInfo
            ? !book.rentalInfo.isAvailable
            : true;
          return {
            ...book,
            rentalInfo: {
              ...book.rentalInfo,
              isAvailable: newStatus,
              rentedDate: newStatus ? undefined : new Date(),
              returnDate: newStatus ? new Date() : undefined,
              rentedBy: newStatus ? undefined : 'Current User',
            },
          };
        }
        return book;
      }),
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredBooks = searchText
    ? books.filter(
        (book) =>
          book.isbn.toLowerCase().includes(searchText) ||
          book.title.toLowerCase().includes(searchText) ||
          book.author.toLowerCase().includes(searchText) ||
          book.publisher.toLowerCase().includes(searchText),
      )
    : books;

  return (
    <>
      <MenuAppBar />
      <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearchChange}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>ISBN</strong>
              </TableCell>
              <TableCell>
                <strong>Title</strong>
              </TableCell>
              <TableCell>
                <strong>Author</strong>
              </TableCell>
              <TableCell>
                <strong>Publisher</strong>
              </TableCell>
              <TableCell>
                <strong>Year of Publish</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Status</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book.id} hover>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.publisher}</TableCell>
                <TableCell>{book.yearOfPublish}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color={book.rentalInfo?.isAvailable ? 'success' : 'error'}
                    onClick={() => toggleBookAvailability(book.id)}
                  >
                    <Bookmark />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BookTable;

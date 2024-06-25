import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useApi } from '../../api/ApiProvider';
import { BookDto } from '../../api/dto/book.dto';
import './BookListReader.css';

const BookListReader: React.FC = () => {
  const [books, setBooks] = useState<BookDto[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const apiClient = useApi();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await apiClient.getBooks();
    if (response.success && response.data) {
      setBooks(response.data);
    } else {
      console.error('Failed to fetch books:', response.statusCode);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter(
    (book) =>
      (book.title &&
        book.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.author &&
        book.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.isbn && book.isbn.includes(searchTerm)),
  );

  return (
    <Box padding={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Typography className="reader-manage-books-title">Book List</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <TextField
          className="search-books"
          label="Search Books"
          variant="outlined"
          margin="normal"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>
      <TableContainer component={Paper} className="table-container">
        <Table stickyHeader aria-label="book table">
          <TableHead>
            <TableRow>
              <TableCell className="table-head-cell">ID</TableCell>
              <TableCell className="table-head-cell">ISBN</TableCell>
              <TableCell className="table-head-cell">Title</TableCell>
              <TableCell className="table-head-cell">Author</TableCell>
              <TableCell className="table-head-cell">Publisher</TableCell>
              <TableCell className="table-head-cell">Publish Year</TableCell>
              <TableCell className="table-head-cell">
                Available Copies
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="table-body-cell">{book.id}</TableCell>
                <TableCell className="table-body-cell">{book.isbn}</TableCell>
                <TableCell className="table-body-cell">{book.title}</TableCell>
                <TableCell className="table-body-cell">{book.author}</TableCell>
                <TableCell className="table-body-cell">
                  {book.publisher}
                </TableCell>
                <TableCell className="table-body-cell">
                  {book.publishedYear}
                </TableCell>
                <TableCell className="table-body-cell">
                  {book.availableCopies}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BookListReader;

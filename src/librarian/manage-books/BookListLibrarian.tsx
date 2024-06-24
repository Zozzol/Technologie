import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
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
import AddBookDialog from './AddBookDialog'; // Import the AddBookDialog component
import { useTranslation } from 'react-i18next';
import './BookListLibrarian.css';

const BookListLibrarian: React.FC = () => {
  const { t } = useTranslation();
  const [books, setBooks] = useState<BookDto[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const apiClient = useApi();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await apiClient.getBooks();
    if (response.success && response.data) {
      setBooks(response.data); // Ensure response.data is an array of BookDto
    } else {
      console.error('Failed to fetch books:', response.statusCode);
    }
  };

  const handleDeleteBook = async (bookId: number) => {
    const response = await apiClient.deleteBook(bookId);
    if (response.success) {
      setBooks(books.filter((book) => book.id !== bookId));
    } else {
      console.error('Failed to delete book:', response.statusCode);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddBook = (newBook: BookDto) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
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
        <Typography variant="h5">{t('ManageBooks')}</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <TextField
          className="search-books"
          label={t('SearchBooks')}
          variant="outlined"
          margin="normal"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button
          className="manage-books-add-button"
          variant="contained"
          color="primary"
          onClick={() => setIsDialogOpen(true)}
        >
          {t('AddBook')}
        </Button>
      </Box>
      <TableContainer component={Paper} className="table-container">
        <Table stickyHeader aria-label="book table">
          <TableHead>
            <TableRow>
              <TableCell className="table-head-cell">{t('ID')}</TableCell>
              <TableCell className="table-head-cell">{t('ISBN')}</TableCell>
              <TableCell className="table-head-cell">{t('Title')}</TableCell>
              <TableCell className="table-head-cell">{t('Author')}</TableCell>
              <TableCell className="table-head-cell">
                {t('Publisher')}
              </TableCell>
              <TableCell className="table-head-cell">
                {t('PublishYear')}
              </TableCell>
              <TableCell className="table-head-cell">
                {t('AvailableCopies')}
              </TableCell>
              <TableCell className="table-head-cell">{t('Actions')}</TableCell>
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
                  {book.publishYear || 'N/A'}
                </TableCell>
                <TableCell className="table-body-cell">
                  {book.availableCopies}
                </TableCell>
                <TableCell className="table-body-cell">
                  <Button
                    className="manage-books-delete-button"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteBook(book.id!)}
                  >
                    {t('Delete')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddBookDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAddBook}
      />
    </Box>
  );
};

export default BookListLibrarian;

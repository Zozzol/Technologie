import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { Book, BookData } from './BookData';
import BookView from './BookView';

const BookTable: React.FC = () => {
  const navigate = useNavigate();
  const bookData: Book[] = BookData();
  const [searchText, setSearchText] = React.useState('');
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const handleDetailsClick = (book: Book) => {
    setSelectedBook(book);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedBook(null);
    setDialogOpen(false);
  };

  const handleLogOutClick = () => {
    navigate('/');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredBooks = searchText
    ? bookData.filter(
        (book) =>
          book.isbn.toLowerCase().includes(searchText) ||
          book.title.toLowerCase().includes(searchText) ||
          book.author.toLowerCase().includes(searchText) ||
          book.publisher.toLowerCase().includes(searchText),
      )
    : bookData;

  return (
    <>
      <Typography variant="h4" component="div" gutterBottom align="center">
        Book List
      </Typography>
      <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearchChange}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Publisher</TableCell>
              <TableCell>Year of Publish</TableCell>
              <TableCell>Show Details</TableCell>{' '}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((book: Book) => (
              <TableRow
                key={book.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                hover
              >
                <TableCell component="th" scope="row">
                  {book.id}
                </TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.publisher}</TableCell>
                <TableCell>{book.yearOfPublish}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDetailsClick(book)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        endIcon={<LogoutIcon />}
        onClick={handleLogOutClick}
      >
        Log Out
      </Button>
      <BookView
        book={selectedBook}
        open={dialogOpen}
        onClose={handleDialogClose}
      />
    </>
  );
};

export default BookTable;

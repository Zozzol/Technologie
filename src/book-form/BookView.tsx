import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Book } from './BookData';

interface BookView {
  book: Book | null;
  open: boolean;
  onClose: () => void;
}

const BookView: React.FC<BookView> = ({ book, open, onClose }) => {
  if (!book) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="book-details-dialog-title"
    >
      <DialogTitle id="book-details-dialog-title">Book Details</DialogTitle>
      <DialogContent>
        <p>
          <strong>ID:</strong> {book.id}
        </p>
        <p>
          <strong>ISBN:</strong> {book.isbn}
        </p>
        <p>
          <strong>Title:</strong> {book.title}
        </p>
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Publisher:</strong> {book.publisher}
        </p>
        <p>
          <strong>Year of Publish:</strong> {book.yearOfPublish}
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookView;

import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Grid,
} from '@mui/material';
import { useApi } from '../../api/ApiProvider';
import { BookDto } from '../../api/dto/book.dto';
import { useTranslation } from 'react-i18next';

interface AddBookDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newBook: BookDto) => void;
}

const AddBookDialog: React.FC<AddBookDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const { t } = useTranslation();
  const [book, setBook] = useState<BookDto>({
    id: undefined,
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    publishedYear: undefined,
    availableCopies: undefined,
  });

  const apiClient = useApi();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]:
        name === 'publishYear' || name === 'availableCopies'
          ? parseInt(value)
          : value,
    }));
  };

  const handleAdd = async () => {
    const response = await apiClient.addBook(book);
    if (response.success && response.data) {
      onAdd(response.data);
      onClose();
    } else {
      console.error('Failed to add book:', response.statusCode);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('AddBook')}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('ID')}
                name="id"
                type="number"
                value={book.id}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('ISBN')}
                name="isbn"
                value={book.isbn}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('Title')}
                name="title"
                value={book.title}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('Author')}
                name="author"
                value={book.author}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('Publisher')}
                name="publisher"
                value={book.publisher}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('PublishYear')}
                name="publishYear"
                value={book.publishedYear}
                onChange={handleChange}
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('AvailableCopies')}
                name="availableCopies"
                value={book.availableCopies}
                onChange={handleChange}
                type="number"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="success">
          {t('Cancel')}
        </Button>
        <Button onClick={handleAdd} color="success">
          {t('Add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBookDialog;

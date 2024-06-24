import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useApi } from '../../api/ApiProvider';
import { LoanDto } from '../../api/dto/loan.dto';

interface AddLoanDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newLoan: LoanDto) => void;
}

const AddLoanDialog: React.FC<AddLoanDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [loan, setLoan] = useState<LoanDto>({
    id: undefined,
    loanStartDate: new Date(),
    loanEndDate: new Date(),
    bookReturnDate: new Date(),
    userId: undefined,
    bookId: undefined,
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const apiClient = useApi();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoan((prevLoan) => ({
      ...prevLoan,
      [name]:
        name === 'loanStartDate' ||
        name === 'loanEndDate' ||
        name === 'bookReturnDate'
          ? new Date(value)
          : parseInt(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loanData = {
        ...loan,
        loanStartDate: loan.loanStartDate?.getTime(),
        loanEndDate: loan.loanEndDate?.getTime(),
        bookReturnDate: loan.bookReturnDate?.getTime(),
      };
      const response = await apiClient.addLoan(loanData as LoanDto);
      if (response.success && response.data) {
        setSuccessMessage('Loan added successfully');
        onAdd(response.data);
        onClose();
      } else {
        setError('Failed to add loan');
      }
    } catch (error) {
      setError('Error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add Loan</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="User ID"
              name="userId"
              value={loan.userId || ''}
              onChange={handleChange}
              type="number"
              fullWidth
            />
            <TextField
              label="Book ID"
              name="bookId"
              value={loan.bookId || ''}
              onChange={handleChange}
              type="number"
              fullWidth
            />
            <TextField
              label="Loan Start Date"
              name="loanStartDate"
              value={loan.loanStartDate?.toISOString().split('T')[0] || ''}
              onChange={handleChange}
              type="date"
              fullWidth
            />
            <TextField
              label="Loan End Date"
              name="loanEndDate"
              value={loan.loanEndDate?.toISOString().split('T')[0] || ''}
              onChange={handleChange}
              type="date"
              fullWidth
            />
            <TextField
              label="Book Return Date"
              name="bookReturnDate"
              value={loan.bookReturnDate?.toISOString().split('T')[0] || ''}
              onChange={handleChange}
              type="date"
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddLoanDialog;

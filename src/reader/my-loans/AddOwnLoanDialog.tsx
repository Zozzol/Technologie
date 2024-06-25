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
import { useTranslation } from 'react-i18next';
import { useApi } from '../../api/ApiProvider';
import { LoanDto } from '../../api/dto/loan.dto';

interface AddOwnLoanDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newLoan: LoanDto) => void;
  userId: number;
}

const AddOwnLoanDialog: React.FC<AddOwnLoanDialogProps> = ({
  open,
  onClose,
  onAdd,
  userId,
}) => {
  const { t } = useTranslation();
  const [loan, setLoan] = useState<LoanDto>({
    id: undefined,
    loanStartDate: new Date(),
    loanEndDate: new Date(),
    bookReturnDate: undefined,
    userId: userId,
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
        name === 'loanStartDate' || name === 'loanEndDate'
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
        bookReturnDate: undefined, // Ensure this is null when adding a new loan
      };
      const response = await apiClient.addLoan(loanData as LoanDto);
      console.log(loanData);
      if (response.success && response.data) {
        setSuccessMessage(t('Loan added successfully'));
        onAdd(response.data);
        onClose();
      } else {
        setError(t('Failed to add loan'));
      }
    } catch (error) {
      setError(t('Error'));
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {t('Add')} {t('Loan')}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label={t('BookID')}
              name="bookId"
              value={loan.bookId || ''}
              onChange={handleChange}
              type="number"
              fullWidth
            />
            <TextField
              label={t('LoanStartDate')}
              name="loanStartDate"
              value={loan.loanStartDate?.toISOString().split('T')[0] || ''}
              onChange={handleChange}
              type="date"
              fullWidth
            />
            <TextField
              label={t('LoanEndDate')}
              name="loanEndDate"
              value={loan.loanEndDate?.toISOString().split('T')[0] || ''}
              onChange={handleChange}
              type="date"
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            {t('Cancel')}
          </Button>
          <Button type="submit" color="primary">
            {t('Add')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddOwnLoanDialog;

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

interface UpdateLoanDialogProps {
  open: boolean;
  onClose: () => void;
  loan: LoanDto | null;
  onUpdate: (updatedLoan: LoanDto) => void;
}

const UpdateLoanDialog: React.FC<UpdateLoanDialogProps> = ({
  open,
  onClose,
  loan,
  onUpdate,
}) => {
  const { t } = useTranslation();
  const [returnDate, setReturnDate] = useState<string>(
    loan?.bookReturnDate?.toISOString().split('T')[0] || '',
  );
  const [error, setError] = useState<string | null>(null);

  const apiClient = useApi();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReturnDate(event.target.value);
  };

  const handleSubmit = async () => {
    if (loan) {
      const date = new Date(returnDate);
      const response = await apiClient.updateBookReturnDate(
        loan.id!,
        date.toISOString().split('T')[0],
      );
      if (response.success) {
        onUpdate({ ...loan, bookReturnDate: date });
        onClose();
      } else {
        setError(t('Failed to update return date'));
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {t('Change')} {t('ReturnDate')}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label={t('ReturnDate')}
            type="date"
            value={returnDate}
            onChange={handleChange}
            fullWidth
          />
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="success">
          {t('Cancel')}
        </Button>
        <Button onClick={handleSubmit} color="success">
          {t('Update')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateLoanDialog;

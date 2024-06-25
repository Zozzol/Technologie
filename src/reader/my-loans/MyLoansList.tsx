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
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../api/ApiProvider';
import { LoanDto } from '../../api/dto/loan.dto';
import './MyLoansList.css';

const MyLoansList: React.FC = () => {
  const { t } = useTranslation();
  const [loans, setLoans] = useState<LoanDto[]>([]);
  const apiClient = useApi();

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    const response = await apiClient.getMyLoans();
    if (response.success && response.data) {
      setLoans(response.data);
    } else {
      console.error('Failed to fetch loans:', response.statusCode);
    }
  };

  return (
    <Box padding={3}>
      <Typography className="my-loans-title">{t('MyLoansList')}</Typography>
      <TableContainer component={Paper} className="table-container">
        <Table stickyHeader aria-label="loans table">
          <TableHead>
            <TableRow>
              <TableCell className="table-head-cell">{t('ID')}</TableCell>
              <TableCell className="table-head-cell">
                {t('LoanStartDate')}
              </TableCell>
              <TableCell className="table-head-cell">
                {t('LoanEndDate')}
              </TableCell>
              <TableCell className="table-head-cell">
                {t('BookReturnDate')}
              </TableCell>
              <TableCell className="table-head-cell">{t('BookID')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell className="table-body-cell">{loan.id}</TableCell>
                <TableCell className="table-body-cell">
                  {new Date(loan.loanStartDate!).toLocaleDateString()}
                </TableCell>
                <TableCell className="table-body-cell">
                  {new Date(loan.loanEndDate!).toLocaleDateString()}
                </TableCell>
                <TableCell className="table-body-cell">
                  {loan.bookReturnDate
                    ? new Date(loan.bookReturnDate).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell className="table-body-cell">{loan.bookId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyLoansList;

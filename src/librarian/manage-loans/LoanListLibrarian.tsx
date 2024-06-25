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
  Typography,
  Dialog,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../api/ApiProvider';
import { LoanDto } from '../../api/dto/loan.dto';
import { BookDto } from '../../api/dto/book.dto';
import { UserDto } from '../../api/dto/user.dto';
import AddLoanDialog from './AddLoanDialog';
import UpdateLoanDialog from './UpdateLoanDialog';
import './LoanListLibrarian.css'; // Import the CSS file

const LoanListLibrarian: React.FC = () => {
  const { t } = useTranslation();
  const [loans, setLoans] = useState<LoanDto[]>([]);
  const [books, setBooks] = useState<{ [key: number]: BookDto }>({});
  const [users, setUsers] = useState<{ [key: number]: UserDto }>({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const [selectedLoan, setSelectedLoan] = useState<LoanDto | null>(null);
  const apiClient = useApi();

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    const response = await apiClient.getLoans();
    if (response.success && response.data) {
      const loansWithDates = response.data.map((loan) => ({
        ...loan,
        loanStartDate: new Date(loan.loanStartDate!),
        loanEndDate: new Date(loan.loanEndDate!),
        bookReturnDate: loan.bookReturnDate
          ? new Date(loan.bookReturnDate)
          : undefined,
      }));

      setLoans(loansWithDates);

      const bookPromises = loansWithDates.map((loan) =>
        apiClient.getBook(loan.bookId!),
      );
      const userPromises = loansWithDates.map((loan) =>
        apiClient.getUser(loan.userId!),
      );

      const bookResponses = await Promise.all(bookPromises);
      const userResponses = await Promise.all(userPromises);

      const booksMap = bookResponses.reduce(
        (acc, res) => {
          if (res.success && res.data) {
            acc[res.data.id!] = res.data;
          }
          return acc;
        },
        {} as { [key: number]: BookDto },
      );

      const usersMap = userResponses.reduce(
        (acc, res) => {
          if (res.success && res.data) {
            acc[res.data.id!] = res.data;
          }
          return acc;
        },
        {} as { [key: number]: UserDto },
      );

      setBooks(booksMap);
      setUsers(usersMap);
    } else {
      console.error(t('Failed to fetch loans'), response.statusCode);
    }
  };

  const handleDeleteLoan = async (loanId: number) => {
    const response = await apiClient.deleteLoan(loanId);
    if (response.success) {
      setLoans(loans.filter((loan) => loan.id !== loanId));
    } else {
      console.error(t('Failed to delete loan'), response.statusCode);
    }
  };

  const handleUpdateLoan = (updatedLoan: LoanDto) => {
    setLoans((prevLoans) =>
      prevLoans.map((loan) =>
        loan.id === updatedLoan.id ? updatedLoan : loan,
      ),
    );
  };

  const openUpdateDialog = (loan: LoanDto) => {
    setSelectedLoan(loan);
    setIsUpdateDialogOpen(true);
  };

  const closeUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
    setSelectedLoan(null);
  };

  const openAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const closeAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handleAddLoan = (newLoan: LoanDto) => {
    setLoans((prevLoans) => [...prevLoans, newLoan]);
  };

  return (
    <Box padding={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Typography className="manage-loans-title">
          {t('ManageLoans')}
        </Typography>
        <Button
          className="manage-loans-add-button"
          variant="contained"
          color="primary"
          onClick={openAddDialog}
        >
          {t('Add')}
        </Button>
      </Box>
      <TableContainer component={Paper} className="table-container">
        <Table stickyHeader aria-label="loan table">
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
              <TableCell className="table-head-cell">{t('UserID')}</TableCell>
              <TableCell className="table-head-cell">
                {t('BookTitle')}
              </TableCell>
              <TableCell className="table-head-cell">{t('Actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell className="table-body-cell">{loan.id}</TableCell>
                <TableCell className="table-body-cell">
                  {loan.loanStartDate?.toLocaleDateString()}
                </TableCell>
                <TableCell className="table-body-cell">
                  {loan.loanEndDate?.toLocaleDateString()}
                </TableCell>
                <TableCell className="table-body-cell">
                  {loan.bookReturnDate?.toLocaleDateString()}
                </TableCell>
                <TableCell className="table-body-cell">
                  {users[loan.userId!]?.login || loan.userId}
                </TableCell>
                <TableCell className="table-body-cell">
                  {books[loan.bookId!]?.title || loan.bookId}
                </TableCell>
                <TableCell className="table-body-cell">
                  <Button
                    className="manage-loans-delete-button"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteLoan(loan.id!)}
                  >
                    {t('Delete')}
                  </Button>
                  <Button
                    className="manage-loans-delete-button"
                    variant="contained"
                    color="primary"
                    onClick={() => openUpdateDialog(loan)}
                  >
                    {t('Return')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddLoanDialog
        open={isAddDialogOpen}
        onClose={closeAddDialog}
        onAdd={handleAddLoan}
      />

      <UpdateLoanDialog
        open={isUpdateDialogOpen}
        onClose={closeUpdateDialog}
        loan={selectedLoan}
        onUpdate={handleUpdateLoan}
      />
    </Box>
  );
};

export default LoanListLibrarian;

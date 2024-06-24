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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useApi } from '../../api/ApiProvider';
import { LoanDto } from '../../api/dto/loan.dto';
import { BookDto } from '../../api/dto/book.dto';
import { UserDto } from '../../api/dto/user.dto';
import NavBarLibrarian from '../home-page-librarian/NavBarLibrarian';
import AddLoanDialog from './AddLoanDialog';

const LoanListLibrarian: React.FC = () => {
  const [loans, setLoans] = useState<LoanDto[]>([]);
  const [books, setBooks] = useState<{ [key: number]: BookDto }>({});
  const [users, setUsers] = useState<{ [key: number]: UserDto }>({});
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [selectedLoan, setSelectedLoan] = useState<LoanDto | null>(null);
  const [returnDate, setReturnDate] = useState<string>('');
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
      console.error('Failed to fetch loans:', response.statusCode);
    }
  };

  const handleDeleteLoan = async (loanId: number) => {
    const response = await apiClient.deleteLoan(loanId);
    if (response.success) {
      setLoans(loans.filter((loan) => loan.id !== loanId));
    } else {
      console.error('Failed to delete loan:', response.statusCode);
    }
  };

  const handleChangeDate = async () => {
    if (selectedLoan) {
      const date = new Date(returnDate);
      const response = await apiClient.updateBookReturnDate(
        selectedLoan.id!,
        date.toISOString().split('T')[0],
      );
      if (response.success) {
        fetchLoans();
        setIsDialogOpen(false);
      } else {
        console.error('Failed to update return date:', response.statusCode);
      }
    }
  };

  const openChangeDateDialog = (loan: LoanDto) => {
    setSelectedLoan(loan);
    setReturnDate(loan.bookReturnDate?.toISOString().split('T')[0] || '');
    setIsDialogOpen(true);
  };

  const closeChangeDateDialog = () => {
    setIsDialogOpen(false);
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
        <Typography variant="h5">Manage Loans</Typography>
        <Button variant="contained" color="primary" onClick={openAddDialog}>
          Add Loan
        </Button>
      </Box>
      <TableContainer component={Paper} className="table-container">
        <Table stickyHeader aria-label="loan table">
          <TableHead>
            <TableRow>
              <TableCell className="table-head-cell">ID</TableCell>
              <TableCell className="table-head-cell">Loan Start Date</TableCell>
              <TableCell className="table-head-cell">Loan End Date</TableCell>
              <TableCell className="table-head-cell">
                Book Return Date
              </TableCell>
              <TableCell className="table-head-cell">User ID</TableCell>
              <TableCell className="table-head-cell">Book Title</TableCell>
              <TableCell className="table-head-cell">Actions</TableCell>
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
                  {users[loan.userId!]?.name || loan.userId}
                </TableCell>
                <TableCell className="table-body-cell">
                  {books[loan.bookId!]?.title || loan.bookId}
                </TableCell>
                <TableCell className="table-body-cell">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteLoan(loan.id!)}
                  >
                    Delete Loan
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openChangeDateDialog(loan)}
                  >
                    Change Date
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isDialogOpen} onClose={closeChangeDateDialog}>
        <DialogTitle>Change Book Return Date</DialogTitle>
        <DialogContent>
          <TextField
            label="Return Date"
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeChangeDateDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleChangeDate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <AddLoanDialog
        open={isAddDialogOpen}
        onClose={closeAddDialog}
        onAdd={handleAddLoan}
      />
    </Box>
  );
};

export default LoanListLibrarian;

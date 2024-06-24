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
import { UserDto } from '../../api/dto/user.dto';
import AddUserDialog from './AddUserDialog';
import './UsersListLibrarian.css';

const UsersListLibrarian: React.FC = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const apiClient = useApi();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await apiClient.getAllUsers();
    if (response.success && response.data) {
      setUsers(response.data);
    } else {
      console.error('Failed to fetch users:', response.statusCode);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    const response = await apiClient.deleteUser(userId);
    if (response.success) {
      setUsers(users.filter((user) => user.id !== userId));
    } else {
      console.error('Failed to delete user:', response.statusCode);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddUser = (newUser: UserDto) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.fullName &&
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.id && user.id.toString().includes(searchTerm)),
  );

  return (
    <Box padding={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Typography variant="h5">Manage Users</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <TextField
          className="search-users"
          label="Search Users"
          variant="outlined"
          margin="normal"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button
          className="manage-users-add-button"
          variant="contained"
          color="primary"
          onClick={() => setIsDialogOpen(true)}
        >
          Add User
        </Button>
      </Box>
      <TableContainer component={Paper} className="table-container">
        <Table stickyHeader aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell className="table-head-cell">ID</TableCell>
              <TableCell className="table-head-cell">Login</TableCell>
              <TableCell className="table-head-cell">Full Name</TableCell>
              <TableCell className="table-head-cell">Role</TableCell>
              <TableCell className="table-head-cell">Email</TableCell>
              <TableCell className="table-head-cell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="table-body-cell">{user.id}</TableCell>
                <TableCell className="table-body-cell">{user.login}</TableCell>
                <TableCell className="table-body-cell">
                  {user.fullName}
                </TableCell>
                <TableCell className="table-body-cell">{user.role}</TableCell>
                <TableCell className="table-body-cell">{user.email}</TableCell>
                <TableCell className="table-body-cell">
                  <Button
                    className="manage-users-delete-button"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteUser(user.id!)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddUserDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAddUser}
      />
    </Box>
  );
};

export default UsersListLibrarian;
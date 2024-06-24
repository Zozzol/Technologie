import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Box,
} from '@mui/material';
import { UserDto } from '../../api/dto/user.dto';
import { useApi } from '../../api/ApiProvider';

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newUser: UserDto) => void;
}

const roles = [
  { value: 'ROLE_LIBRARIAN', label: 'Librarian' },
  { value: 'ROLE_READER', label: 'Reader' },
];

const AddUserDialog: React.FC<AddUserDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('ROLE_READER');
  const [email, setEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const apiClient = useApi();

  const handleAddUser = async () => {
    const newUser: UserDto = {
      id: undefined,
      login: login,
      password: password,
      role: role,
      email: email,
      fullName: fullName,
    };

    const response = await apiClient.addUser(newUser);
    if (response.success && response.data) {
      onAdd(response.data);
      onClose();
    } else {
      console.error('Failed to add user:', response.statusCode);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            label="Role"
            select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddUser} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;

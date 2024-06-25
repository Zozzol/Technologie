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
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('ROLE_READER');
  const [fullName, setFullName] = useState<string>('');
  const apiClient = useApi();

  const handleAddUser = async () => {
    const newUser: UserDto = {
      id: undefined,
      login: login,
      password: password,
      role: role,
      fullName: fullName,
    };

    const response = await apiClient.addUser(newUser);
    if (response.success && response.data) {
      onAdd(response.data);
      onClose();
    } else {
      console.error(t('Failed to add user'), response.statusCode);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {t('Add')} {t('User')}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label={t('Login')}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            fullWidth
          />
          <TextField
            label={t('Password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            label={t('Role')}
            select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {t(option.label)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label={t('FullName')}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="success">
          {t('Cancel')}
        </Button>
        <Button onClick={handleAddUser} color="success">
          {t('Add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;

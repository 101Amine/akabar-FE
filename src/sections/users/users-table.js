import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Scrollbar } from 'src/components/utils/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import { Snackbar, Alert } from '@mui/material';
import { router } from 'next/client';
import { fetchWithHeaders } from '../../utils/api';

export const UsersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const handleEdit = (user) => {
    router.push({
      pathname: '/users/updateUser',
      query: { user: JSON.stringify(user) },
    });
  };

  const handleBlock = async (id) => {
    const payload = {
      active: false,
    };

    try {
      const response = await fetchWithHeaders('/users/profile', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      setSnackbarMessage('User blocked successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error blocking user:', error.message);
      setSnackbarMessage('Error blocking user.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.id);
                const fullName = `${customer.firstName} ${customer.lastName}`;

                return (
                  <TableRow hover key={customer.id} selected={isSelected}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar>{getInitials(fullName)}</Avatar>
                        <Typography variant="subtitle2">{fullName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.mobilePhoneNumber}</TableCell>
                    <TableCell>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ float: 'right' }}
                      >
                        <IconButton
                          color="primary"
                          aria-label="edit customer"
                          onClick={() => {
                            handleEdit(customer);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          aria-label="block customer"
                          onClick={() => handleBlock(customer.id)}
                        >
                          <BlockIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

UsersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};

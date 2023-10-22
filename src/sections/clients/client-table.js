import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Avatar,
  Stack,
  Typography
} from '@mui/material';
import { getInitials } from 'src/utils/get-initials';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { fetchWithHeaders } from '../../utils/api';
import { Snackbar, Alert } from '@mui/material';


export const ClientTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const router = useRouter();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleEdit = (client) => {
    console.log("Editing customer with ID:", client.id);
    router.push({
      pathname: '/clients/updateClient',
      query: { client: JSON.stringify(client) }
    });
  };

  const handleBlock = async (email) => {

    const payload = {
      active: false,
      email: ''
    };

    try {
      const response = await fetchWithHeaders('/users/profile', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      console.log("User blocked successfully", response);
      setSnackbarMessage('User blocked successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

    } catch (error) {
      console.error("Error blocking user:", error.message);
      setSnackbarMessage('Error blocking user.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };


  return (
    <Card>
        <Box sx={{ minWidth: 1100 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell>Fax</TableCell>
                <TableCell>ICE</TableCell>
                <TableCell>Bank Account</TableCell>
                <TableCell>Address</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items && items.map((customer) => {
                console.log("customer",customer)
                const fullName = `${customer.firstName} ${customer.lastName}`;

                return (
                  <TableRow
                    hover
                    key={customer.id}
                  >
                     <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar>
                          {getInitials(fullName)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {fullName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.mobilePhoneNumber}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.fax}</TableCell>
                    <TableCell>{customer.ice}</TableCell>
                    <TableCell>{customer.bankAccount}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} sx={{ float: 'right' }}>
                        <IconButton color="primary" aria-label="edit customer" onClick={() => handleEdit(customer)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="block customer" onClick={() => handleBlock()}>
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
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </Card>
  );
};
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
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { getInitials } from 'src/utils/get-initials';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { fetchWithHeaders } from '../../utils/api';

export const DataTable = ({
  count = 0,
  items = [],
  onPageChange = () => {},
  onRowsPerPageChange,
  page = 0,
  rowsPerPage = 0,
  selected = [],
  columns,
  entity = 'user',
}) => {
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleEdit = (item) => {
    const route = entity === 'client' ? '/clients/updateClient' : '/users/updateUser';
    router.push({
      pathname: route,
      query: { [entity]: JSON.stringify(item) },
    });
  };

  const handleBlock = async (idOrEmail) => {
    let apiEndpoint;
    if (entity === 'user') {
      apiEndpoint = '/users/block'; // Adjust the endpoint as per your API setup
    } else if (entity === 'client') {
      apiEndpoint = '/clients/block'; // Adjust the endpoint as per your API setup
    }

    const payload = {
      active: false,
      ...(typeof idOrEmail === 'string' && { email: idOrEmail }),
    };

    try {
      const response = await fetchWithHeaders(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      setSnackbarMessage(`${entity.charAt(0).toUpperCase() + entity.slice(1)} blocked successfully!`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(`Error blocking ${entity}.`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key}>{col.label}</TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => {
              const fullName = `${item.firstName} ${item.lastName}`;
              return (
                <TableRow hover key={item.id}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.key === 'name' ? (
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Avatar>{getInitials(fullName)}</Avatar>
                          <Typography variant="subtitle2">{fullName}</Typography>
                        </Stack>
                      ) : (
                        item[col.key]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Stack direction="row" spacing={1} sx={{ float: 'right' }}>
                      <IconButton
                        color="primary"
                        aria-label={`edit ${entity}`}
                        onClick={() => handleEdit(item)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        aria-label={`block ${entity}`}
                        onClick={() => handleBlock(item.id || item.email)}
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

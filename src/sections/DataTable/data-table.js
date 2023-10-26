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
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { blockUser, unblockUser } from '../../redux/userSlice';
import LockOpenIcon from '@mui/icons-material/LockOpen';

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
  const dispatch = useDispatch();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleEdit = (item) => {
    const route =
      entity === 'client'
        ? '/ventes/clients/updateClient'
        : '/ventes/users/updateUser';
    router.push({
      pathname: route,
      query: { [entity]: JSON.stringify(item) },
    });
  };

  const handleBlockOrUnblock = async (item) => {
    try {
      if (item.active) {
        await dispatch(blockUser(item.id || item.email));
        setSnackbarMessage(
          `${
            entity.charAt(0).toUpperCase() + entity.slice(1)
          } a été bloqué avec succès!`,
        );
      } else {
        await dispatch(unblockUser(item.id || item.email));
        setSnackbarMessage(
          `${
            entity.charAt(0).toUpperCase() + entity.slice(1)
          } a été débloqué avec succès!`,
        );
      }
      setSnackbarSeverity('succès');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(
        `Error ${item.active ? 'bloquer' : 'débloquer'} ${entity}.`,
      );
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
                <TableRow
                  key={item.id}
                  sx={{
                    backgroundColor: item.active
                      ? 'transparent'
                      : 'rgba(255,0,0,0.1)',
                  }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.key === 'name' ? (
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Avatar>{getInitials(fullName)}</Avatar>
                          <Typography variant="subtitle2">
                            {fullName}
                          </Typography>
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
                        color={item.active ? 'secondary' : 'primary'}
                        aria-label={
                          item.active ? `block ${entity}` : `unblock ${entity}`
                        }
                        onClick={() => handleBlockOrUnblock(item)}
                      >
                        {item.active ? <BlockIcon /> : <LockOpenIcon />}
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

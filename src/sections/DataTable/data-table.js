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
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { getInitials } from 'src/utils/get-initials';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { blockUser, unblockUser } from '../../redux/userSlice';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

export const DataTable = ({
  count = 0,
  items = [],
  onPageChange = () => {},
  onRowsPerPageChange,
  page = 0,
  rowsPerPage = 8,
  selected = [],
  onRowClick,
  isDialog = false,
  columns,
  entity,
  showPagination = true,
  isAffaire = false,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    onRowsPerPageChange(event.target.value);
  };

  const renderColumnContent = (col, item, fullName) => {
    if (col.key === 'name' && !isAffaire) {
      return (
        <Stack alignItems="center" direction="row" spacing={2}>
          <Avatar>{getInitials(fullName)}</Avatar>
          <Typography variant="subtitle2">{fullName}</Typography>
        </Stack>
      );
    }

    if (
      col.key === 'status' &&
      isAffaire &&
      item[col.key] === 'EN_PREPARATION'
    ) {
      return 'En cours de préparation';
    }

    if (col.key === 'active') {
      return item[col.key] ? 'Active' : 'Bloqué';
    }

    return item[col.key] ? item[col.key] : <Box>N/A</Box>;
  };

  const getStatusColor = (status) => {
    console.log('status', status);
    switch (status) {
      case 'EN_PREPARATION':
        return '#ebcb0c';
      case 'Bloqué':
      case false:
        return '#E53E3E';
      case 'Active':
      case true:
        return '#38A169';
      default:
        return 'transparent';
    }
  };

  const handleEdit = (item) => {
    let route;

    switch (entity) {
      case 'client':
        route = '/ventes/clients/updateClient';
        break;
      case 'affaire':
        route = '/ventes/affaires/updateAffaire';
        break;
      case 'user':
        route = '/outils/utilisateurs/updateUser';
        break;
    }

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
      setSnackbarSeverity('success');
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
                <TableCell
                  key={col.key}
                  sx={{ backgroundColor: '#164CC8', color: 'white' }}
                >
                  {col.label}
                </TableCell>
              ))}
              <TableCell sx={{ backgroundColor: '#164CC8' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => {
              const fullName = `${item.firstName} ${item.lastName}`;
              return (
                <TableRow
                  key={item.id}
                  sx={{
                    backgroundColor:
                      item.active === false
                        ? 'hsla(0, 100%, 90%, 0.25)'
                        : 'transparent',
                    cursor: isDialog ? 'pointer' : 'default',
                    '&:hover': {
                      backgroundColor: isDialog
                        ? 'rgba(22,76,200,0.1)'
                        : undefined,
                    },
                  }}
                  onClick={() => isDialog && onRowClick && onRowClick(item)}
                >
                  {columns.map((col) => {
                    const isStatusColumn =
                      col.key === 'status' || col.key === 'active';
                    const cellStyle = isStatusColumn
                      ? {
                          backgroundColor: getStatusColor(item[col.key]),
                          borderRadius: '8px',
                          color: '#fff',
                          padding: '4px 8px',
                        }
                      : {};

                    return (
                      <TableCell key={col.key}>
                        {isStatusColumn ? (
                          <Box
                            sx={{
                              ...cellStyle,
                              display: 'block',
                              width: 'fit-content',
                            }}
                          >
                            {typeof item[col.key] === 'boolean'
                              ? item[col.key]
                                ? 'Active'
                                : 'Bloqué'
                              : item[col.key]}{' '}
                          </Box>
                        ) : (
                          renderColumnContent(col, item, fullName)
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Stack direction="row" spacing={1} sx={{ float: 'right' }}>
                      {!isDialog && (
                        <IconButton
                          color="primary"
                          aria-label={`edit ${entity}`}
                          onClick={() => handleEdit(item)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      {entity === 'user' && !isAffaire && (
                        <IconButton
                          color={item.active ? 'secondary' : 'primary'}
                          aria-label={
                            item.active
                              ? `block ${entity}`
                              : `unblock ${entity}`
                          }
                          onClick={() => handleBlockOrUnblock(item)}
                        >
                          {item.active ? <BlockIcon /> : <LockOpenIcon />}
                        </IconButton>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      {showPagination && (
        <TablePagination
          component="div"
          count={count}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage="Lignes par page:"
        />
      )}
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

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

export const ClientTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  return (
    <Card>
        <Box sx={{ minWidth: 1100 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile Phone</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Fax</TableCell>
                <TableCell>ICE</TableCell>
                <TableCell>Bank Account</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
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
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.mobilePhoneNumber}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.fax}</TableCell>
                    <TableCell>{customer.ice}</TableCell>
                    <TableCell>{customer.bankAccount}</TableCell>
                    <TableCell>{customer.address}</TableCell>
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
    </Card>
  );
};
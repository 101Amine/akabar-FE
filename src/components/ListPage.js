import React from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import BackButton from '../components/BackButton';

const ListPage = ({
  title,
  columns,
  entity,
  filtersComponent: FiltersComponent,
  useListPageHook,
  createAction,
}) => {
  const {
    page,
    rowsPerPage,
    totalCount,
    items,
    handlePageChange,
    handleRowsPerPageChange,
  } = useListPageHook();

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <BackButton />
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Typography variant="h4" marginTop={'70px'}>
              {title}
            </Typography>
            <Button
              onClick={createAction}
              startIcon={
                <SvgIcon fontSize="small">
                  <PlusIcon />
                </SvgIcon>
              }
              variant="contained"
            >
              Nouveau {entity}
            </Button>
          </Stack>
          <FiltersComponent />
          <DataTable
            count={totalCount}
            items={items}
            columns={columns}
            entity={entity}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default ListPage;

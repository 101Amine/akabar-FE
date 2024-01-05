import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Fade from '@mui/material/Fade';
import { Dialog, DialogContent, IconButton, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataTable } from '../../sections/DataTable/data-table';

export const SelectDialog = ({
  setOpenDialog,
  setCloseDialog,
  openDialog,
  fetchDataAction,
  setPage,
  setRowsPerPage,
  filterComponent: FilterComponent,
  dataSelector,
  totalDataSelector,
  columns,
  entity,
  pageTitle,
  onItemSelect,
  additionalData,
  fetchFilteredItems,
  isAffaire,
  filters,
  setFilters,
}) => {
  const totalData = useSelector(totalDataSelector);
  const data = useSelector(dataSelector);
  const page = useSelector((state) => state[entity].page);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataAction({}));
  }, [dispatch, fetchDataAction]);

  const handlePageChange = useCallback(
    (event) => {
      dispatch(setPage(event));
      dispatch(fetchDataAction({}));
    },
    [dispatch, fetchDataAction],
  );

  const handleRowsPerPageChange = useCallback(
    (value) => {
      dispatch(setRowsPerPage(value));
      dispatch(fetchDataAction({}));
    },
    [dispatch, fetchDataAction],
  );

  const handleRowClick = useCallback(
    (item) => {
      if (onItemSelect) {
        onItemSelect(item, additionalData);
      }
      setCloseDialog();
    },
    [onItemSelect, additionalData, setOpenDialog],
  );

  const onSubmitFilters = () => {
    if (fetchFilteredItems) {
      fetchFilteredItems(filters);
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => setCloseDialog()}
      fullWidth
      maxWidth={'xl'}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 100 }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: (theme) => theme.spacing(2),
        }}
      >
        {pageTitle}
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setCloseDialog()}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: (theme) => theme.spacing(3) }}>
        <FilterComponent
          filters={filters}
          onFilterChange={(filterKey, value) => {
            setFilters((prevFilters) => ({
              ...prevFilters,
              [filterKey]: value,
            }));
          }}
          onFilterSubmit={onSubmitFilters}
        />
        <DataTable
          count={totalData}
          items={data}
          isAffaire={isAffaire}
          columns={columns}
          entity={entity}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          isDialog={true}
          showPagination={false}
          rowsPerPage={8}
          onRowClick={handleRowClick}
        />
      </DialogContent>
    </Dialog>
  );
};

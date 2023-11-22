import React, { useCallback, useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { ClientFilters } from '../sections/clients/client-search';
import { DataTable } from '../sections/DataTable/data-table';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setRowsPerPage } from '../redux/userSlice';
import { fetchAffaires, setAffaireDetails } from '../redux/affaireSlice';
import { AffairesFilters } from '../sections/affaires/affaires-search';
import { useRouter } from 'next/router';
import affaireDetails from './AffaireDetails';

const affaireColumns = [
  { key: 'name', label: 'Nom' },
  { key: 'clientName', label: 'Client' },
  { key: 'type', label: 'Type affaire' },
  { key: 'productType', label: 'Type produit' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status' },
];

const PopupAffaire = ({ open, onClose, setOpenDialog }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const page = useSelector((state) => state.affaire.page);
  const rowsPerPage = useSelector((state) => state.affaire.rowsPerPage);
  const affaires = useSelector((state) => state.affaire.affaires);
  const totalAffaires = useSelector((state) => state.affaire.totalAffaires);

  const [setSelectedAffaire, selectedAffaire] = useState();
  const [filters, setFilters] = useState({
    'client.nameClient': '',
    name: '',
  });

  const handleRowClick = (affaire) => {
    setSelectedAffaire(affaire);
    onClose();
    handleAffaireDetailsChange('clientName', affaire.name);
  };

  const handleAffaireDetailsChange = useCallback(
    (nameOrEvent, value) => {
      let newName, newValue;

      if (nameOrEvent && nameOrEvent.target) {
        newName = nameOrEvent.target.name;
        newValue = nameOrEvent.target.value;
      } else {
        newName = nameOrEvent;
        newValue = value;
      }

      dispatch(setAffaireDetails({ ...affaireDetails, [newName]: newValue }));
    },
    [affaireDetails, dispatch],
  );

  const handlePageChange = useCallback(
    (event) => {
      dispatch(setPage(event));
      dispatch(fetchAffaires({}));
    },
    [dispatch],
  );

  const handleRowsPerPageChange = useCallback(
    (value) => {
      dispatch(setRowsPerPage(value));
      dispatch(fetchAffaires({}));
    },
    [dispatch],
  );

  const fetchFilteredAffaires = useCallback(() => {
    const searchCriteriaList = Object.entries(filters)
      .map(([key, value]) => {
        return {
          filterKey: key,
          operation: 'cn',
          value: value,
          dataOption: 'all',
        };
      })
      .filter(Boolean);

    console.log('searchCriteriaList', searchCriteriaList);

    const searchFilter = {
      searchCriteriaList: searchCriteriaList,
      dataOption: 'all',
    };

    dispatch(fetchAffaires(searchFilter));
  }, [dispatch, filters]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: '80%',
          width: '80%',
          maxWidth: 'unset',
          padding: 3,
        },
      }}
    >
      <DialogTitle>Suggested Affaires</DialogTitle>
      <DialogContent>
        <AffairesFilters
          filters={filters}
          onFilterChange={(filterKey, value) => {
            setFilters((prevFilters) => ({
              ...prevFilters,
              [filterKey]: value,
            }));
          }}
          onFilterSubmit={() => {
            fetchFilteredAffaires();
          }}
        />{' '}
        <DataTable
          count={totalAffaires}
          items={affaires}
          isAffaire={true}
          columns={affaireColumns}
          entity="affaires"
          onPageChange={handlePageChange}
          handleRowClick={handleRowClick}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          isPopup={true}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PopupAffaire;

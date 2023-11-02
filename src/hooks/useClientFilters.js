// hooks/useClientFilters.js
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchClients } from '../redux/clientSlice';

export const useClientFilters = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    nameClient: '',
    codeClient: '',
    ICE: '',
  });

  const fetchFilteredClients = useCallback(() => {
    const searchCriteriaList = Object.entries(filters)
      .map(([key, value]) => {
        if (value) {
          return {
            filterKey: key,
            operation: 'cn',
            value: value,
            dataOption: 'all',
          };
        }
        return null;
      })
      .filter(Boolean);

    const searchFilter = {
      searchCriteriaList: searchCriteriaList,
      dataOption: 'all',
    };

    dispatch(fetchClients(searchFilter));
  }, [dispatch, filters]);

  return {
    filters,
    setFilters,
    fetchFilteredClients,
  };
};

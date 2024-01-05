import { useCallback } from 'react';

export const useItemsFilters = ({
  filters,
  setFilters,
  dispatch,
  fetchAction,
}) => {
  const fetchFilteredItems = useCallback(() => {
    const searchCriteriaList = Object.entries(filters)
      .map(([key, value]) => {
        if (value) {
          return {
            filterKey: key,
            operation: 'cn', // 'cn' stands for 'contains'
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

    dispatch(fetchAction(searchFilter));
  }, [dispatch, filters]);

  return {
    filters,
    setFilters,
    fetchFilteredItems,
  };
};

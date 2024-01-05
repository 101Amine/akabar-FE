import { useCallback } from 'react';

export const useItemsFiltersV2 = ({
  filters,
  setFilters,
  dispatch,
  fetchAction,
}) => {
  const fetchFilteredItems = useCallback(() => {
    console.log('filters', filters);
    const searchCriteriaList = Object.entries(filters)
      .map(([key, value]) => {
        if (value) {
          return {
            fieldName: key,
            value: value + '%',
          };
        }
        return null;
      })
      .filter(Boolean);

    const searchFilter = {
      searchCriteriaList: searchCriteriaList,
    };

    dispatch(fetchAction(searchFilter));
  }, [dispatch, filters]);

  return {
    filters,
    setFilters,
    fetchFilteredItems,
  };
};

import { useCallback } from 'react';
import { setAffaireDetails } from '../redux/affaireSlice';
import { setDevisDetails } from '../redux/devisSlice';

export const useAffaireDetailsHandler = (affaireDetails, dispatch) => {
  return useCallback(
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
};

export const useDevisDetailsHandler = (devisDetails, dispatch) => {
  return useCallback(
    (nameOrEvent, value) => {
      let newName, newValue;

      if (nameOrEvent && nameOrEvent.target) {
        newName = nameOrEvent.target.name;
        newValue = nameOrEvent.target.value;
      } else {
        newName = nameOrEvent;
        newValue = value;
      }

      dispatch(setDevisDetails({ ...devisDetails, [newName]: newValue }));
    },
    [devisDetails, dispatch],
  );
};

import { useState } from 'react';

export const useDialogs = (initialDialogStates) => {
  const [openDialogs, setOpenDialogs] = useState(initialDialogStates);

  const handleOpenDialog = (dialogType) => {
    setOpenDialogs({ ...openDialogs, [dialogType]: true });
  };

  const handleCloseDialog = (dialogType) => {
    setOpenDialogs({ ...openDialogs, [dialogType]: false });
  };

  return { openDialogs, handleOpenDialog, handleCloseDialog };
};

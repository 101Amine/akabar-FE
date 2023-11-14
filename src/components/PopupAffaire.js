import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

const PopupAffaire = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Suggested Affaires</DialogTitle>
      <DialogContent>Affaire</DialogContent>
    </Dialog>
  );
};

export default PopupAffaire;

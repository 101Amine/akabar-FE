import React from 'react';
import FormTextField from '../Affaire/FormTextField';

const AffaireDetails = ({ affaireDetails, handleChange, formErrors }) => {
  return (
    <div>
      <FormTextField
        label="Nom"
        name="name"
        value={affaireDetails.name}
        onChange={handleChange}
        error={formErrors.name}
        helperText={formErrors.name}
      />
      {/* Add other detail fields similar to above */}
    </div>
  );
};

export default AffaireDetails;

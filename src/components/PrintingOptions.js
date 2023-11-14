import React from 'react';
import FormRadioGroup from './FormRadioGroup';

const PrintingOptions = ({
  affaireDetails,
  radioValues,
  handleChange,
  formErrors,
}) => {
  const impressionOptions = [
    { value: 'oui', label: 'Oui' },
    { value: 'non', label: 'Non' },
  ];

  return (
    <div>
      <FormRadioGroup
        name="avecImpression"
        value={radioValues.avecImpression}
        onChange={handleChange}
        options={impressionOptions}
        error={formErrors.avecImpression}
        helperText={formErrors.avecImpression}
      />
      {/* Additional fields based on 'avecImpression' value can be added here */}
    </div>
  );
};

export default PrintingOptions;

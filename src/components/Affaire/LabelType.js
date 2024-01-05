import React from 'react';
import FormRadioGroup from './FormRadioGroup';

const LabelType = ({ radioValues, handleRadioChange, formErrors }) => {
  const labelTypeOptions = [
    { value: 'STANDARD', label: 'standard' },
    { value: 'PERSONNALISE', label: 'personalisé' },
  ];

  return (
    <FormRadioGroup
      name="type"
      value={radioValues.type}
      onChange={handleRadioChange('type')}
      options={labelTypeOptions}
      error={formErrors.type}
      helperText={formErrors.type}
    />
  );
};

export default LabelType;

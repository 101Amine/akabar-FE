import React from 'react';

import {
  Card,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Checkbox,
  FormGroup,
  CardContent,
  FormHelperText,
} from '@mui/material';
import { A_NORMAL } from '../../../components/Icons/A_NORMAL';
import { A_RIGHT } from '../../../components/Icons/A_RIGHT';
import { A_LEFT } from '../../../components/Icons/A_LEFT';
import { A_DOWN } from '../../../components/Icons/A_DOWN';

const iconPaths = {
  N_1: <A_NORMAL />,
  N_2: <A_RIGHT />,
  N_3: <A_LEFT />,
  N_4: <A_DOWN />,
  N_5: <A_NORMAL />,
  N_6: <A_RIGHT />,
  N_7: <A_LEFT />,
  N_8: <A_DOWN />,
};

function SortieSelectionCard({
  sortieType = 'Externe',
  onSortieTypeChange,
  selectedPositions,
  onPositionChange,
  positions,
  formErrors,
}) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Sens de sortie :
        </Typography>
        <FormControl>
          <RadioGroup
            row
            value={sortieType}
            onChange={onSortieTypeChange}
            name="sortieType"
            checked={sortieType === 'Interne'}
          >
            <FormControlLabel
              value="Externe"
              control={<Radio />}
              label="Externe"
              checked={sortieType === 'Externe'}
            />

            <FormControlLabel
              value="Interne"
              control={<Radio />}
              label="Interne"
            />
          </RadioGroup>
        </FormControl>
        {sortieType && (
          <FormGroup row>
            {positions?.map((position) => {
              return (
                <FormControlLabel
                  key={position}
                  control={
                    <Checkbox
                      checked={selectedPositions.includes(position)}
                      onChange={onPositionChange}
                      name={`N_${position.split('_')[1]}`}
                    />
                  }
                  label={iconPaths[position]}
                />
              );
            })}
          </FormGroup>
        )}
      </CardContent>
    </Card>
  );
}

export default SortieSelectionCard;

import React from 'react';
import {
  Card,
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const CustomCardComponent = () => {
  return (
    <Card raised sx={{ padding: 4, marginBottom: 5, marginTop: 5 }}>
      <Typography variant="h6" component="div">
        EXISTANCE FILMS, CLICHES ET FORME DE DECOUPE
      </Typography>
      <Box display="flex" justifyContent="space-between" gap={2} mt={2}>
        {/* First section for FORME DE DECOUPE */}
        <Card raised sx={{ flex: 1, mr: 1, padding: 2 }}>
          <FormControl
            component="fieldset"
            sx={{ width: '100%', height: '90px' }}
          >
            <Box display={'flex'} justifyContent={'space-between'}>
              <FormLabel component="legend" sx={{ fontWeight: '700' }}>
                FORME DE DECOUPE
              </FormLabel>
              <RadioGroup row name="decoupe">
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="OUI"
                  disabled
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="NON"
                  disabled
                />
              </RadioGroup>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              marginLeft="auto"
              marginTop="auto"
            >
              <AddShoppingCartIcon />
              <Typography variant="body1" ml={1} fontWeight={'600'}>
                à commander
              </Typography>
            </Box>
          </FormControl>
        </Card>

        {/* Second section for FILMS ET CLICHES */}
        <Card raised sx={{ flex: 1, ml: 1, padding: 2 }}>
          <FormControl
            component="fieldset"
            sx={{ width: '100%', height: '90px' }}
          >
            <Box display={'flex'} justifyContent={'space-between'}>
              <FormLabel component="legend" sx={{ fontWeight: '700' }}>
                FILMS ET CLICHES
              </FormLabel>
              <RadioGroup row name="films">
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="OUI"
                  disabled
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="NON"
                  disabled
                />
              </RadioGroup>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              marginLeft="auto"
              marginTop="auto"
            >
              <AddShoppingCartIcon />
              <Typography variant="body1" ml={1} fontWeight={'600'}>
                à commander
              </Typography>
            </Box>
          </FormControl>
        </Card>
      </Box>
    </Card>
  );
};

export default CustomCardComponent;

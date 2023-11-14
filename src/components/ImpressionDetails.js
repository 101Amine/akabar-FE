import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import SortieSelectionCard from '../pages/production/affaires/senseSortieCheckBoxes';
import MediaBloc from './MediaBloc';
const ImpressionDetails = ({
  affaireDetails,
  radioValues,
  handleRadioChange,
  handleChange,
  formErrors,
  selectedSortie,
  SortiePositions,
}) => {
  return (
    <Grid>
      <Card
        style={{
          marginBottom: '1em',
          marginTop: '2em',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        <CardContent>
          <SortieSelectionCard
            sortieType={radioValues.typeSortie}
            onSortieTypeChange={handleRadioChange('typeSortie')}
            selectedPositions={
              selectedSortie
                ? [selectedSortie.replace('EXT_', 'N_').replace('INT_', 'N_')]
                : []
            }
            onPositionChange={handleChange}
            positions={SortiePositions}
            formErrors={formErrors}
          />
          <Typography
            ariant="h3"
            style={{
              fontWeight: 600,
              fontSize: 18,
              marginBottom: 10,
              marginTop: 30,
            }}
          >
            Poses d'etiquette :
          </Typography>
          <FormControl error={Boolean(formErrors.poseEtiquette)}>
            <RadioGroup
              row
              value={radioValues.poseEtiquette}
              onChange={handleRadioChange('poseEtiquette')}
            >
              <FormControlLabel value="AUTO" control={<Radio />} label="Auto" />
              <FormControlLabel
                value="MANUELLE"
                control={<Radio />}
                label="Manuelle"
              />
            </RadioGroup>
            <FormHelperText>{formErrors.poseEtiquette}</FormHelperText>
          </FormControl>
          <div style={{ display: 'flex', gap: 100, marginTop: 20 }}>
            <div>
              <Typography
                ariant="h3"
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                Repiquage
              </Typography>
              <FormControl error={Boolean(formErrors.repiquage)}>
                <RadioGroup
                  row
                  value={radioValues.repiquage}
                  onChange={handleRadioChange('repiquage')}
                >
                  <Grid container spacing={1}>
                    <Grid item>
                      <FormControlLabel
                        value="oui"
                        control={<Radio />}
                        label="Oui"
                        checked={affaireDetails.repiquage === true}
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        value="non"
                        control={<Radio />}
                        label="Non"
                        checked={affaireDetails.repiquage === false}
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
                <FormHelperText>{formErrors.repiquage}</FormHelperText>
              </FormControl>
            </div>
            <div>
              <Typography
                ariant="h3"
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                Vernis
              </Typography>
              <FormControl error={Boolean(formErrors.vernis)}>
                <RadioGroup
                  row
                  value={radioValues.vernis}
                  onChange={handleRadioChange('vernis')}
                >
                  <Grid container spacing={1}>
                    <Grid item>
                      <FormControlLabel
                        value="oui"
                        control={<Radio />}
                        label="Oui"
                        checked={affaireDetails.vernis === true}
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        value="non"
                        control={<Radio />}
                        label="Non"
                        checked={affaireDetails.vernis === false}
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
                <FormHelperText>{formErrors.vernis}</FormHelperText>
              </FormControl>
            </div>
            <div>
              <Typography
                ariant="h3"
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                Dorure
              </Typography>
              <FormControl error={Boolean(formErrors.dorure)}>
                <RadioGroup
                  row
                  value={radioValues.dorure}
                  onChange={handleRadioChange('dorure')}
                >
                  <Grid container spacing={1}>
                    <Grid item>
                      <FormControlLabel
                        value="oui"
                        control={<Radio />}
                        label="Oui"
                        checked={affaireDetails.dorure === true}
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        value="non"
                        control={<Radio />}
                        label="Non"
                        checked={affaireDetails.dorure === false}
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
                <FormHelperText>{formErrors.dorure}</FormHelperText>
              </FormControl>
            </div>
            <div>
              <Typography
                ariant="h3"
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                Plastification
              </Typography>
              <FormControl error={Boolean(formErrors.Plastification)}>
                <RadioGroup
                  row
                  value={affaireDetails.plasification}
                  onChange={handleRadioChange('plasification')}
                >
                  <Grid container spacing={1}>
                    <Grid item>
                      <FormControlLabel
                        value="oui"
                        control={<Radio />}
                        label="Oui"
                        checked={affaireDetails.plasification === true}
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        value="non"
                        control={<Radio />}
                        label="Non"
                        checked={affaireDetails.plasification === false}
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
                <FormHelperText>{formErrors.Plastification}</FormHelperText>
              </FormControl>
            </div>

            <div>
              {affaireDetails.format !== 'OVALE' &&
                affaireDetails.format !== 'RONDE' && (
                  <>
                    <Typography
                      variant="h3"
                      style={{
                        fontWeight: 600,
                        fontSize: 18,
                        marginBottom: 10,
                      }}
                    >
                      Existance de rayon de coin
                    </Typography>

                    <FormControl error={Boolean(formErrors.ExistanceRayon)}>
                      <RadioGroup
                        row
                        value={affaireDetails.existanceDeRayonDeCoin}
                        onChange={handleRadioChange('existanceDeRayonDeCoin')}
                      >
                        <Grid container spacing={1}>
                          <Grid item>
                            <FormControlLabel
                              value="oui"
                              control={<Radio />}
                              label="Oui"
                              checked={
                                affaireDetails.existanceDeRayonDeCoin === true
                              }
                            />
                          </Grid>
                          <Grid item>
                            <FormControlLabel
                              value="non"
                              control={<Radio />}
                              label="Non"
                              checked={
                                affaireDetails.existanceDeRayonDeCoin === false
                              }
                            />
                          </Grid>
                        </Grid>
                      </RadioGroup>
                      <FormHelperText>
                        {formErrors.ExistanceRayon}
                      </FormHelperText>
                    </FormControl>
                  </>
                )}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              width: '100%',
              gap: 20,
              marginTop: 20,
            }}
          >
            <TextField
              label="Nbr Etq / bobine"
              name="nbrEtqParBobine"
              type="number"
              margin="normal"
              sx={{ width: '45%' }}
              onChange={handleChange}
              error={Boolean(formErrors.nbrEtqParBobine)}
              helperText={formErrors.nbrEtqParBobine}
            />
            <TextField
              label="Nbr Etq/ de front"
              name="nbrEtqDeFront"
              type="number"
              margin="normal"
              sx={{ width: '45%' }}
              onChange={handleChange}
              error={Boolean(formErrors.nbrEtqDeFront)}
              helperText={formErrors.nbrEtqDeFront}
            />

            <FormControl
              margin="normal"
              fullWidth
              error={Boolean(formErrors.mandrin)}
            >
              <InputLabel>Mandrin</InputLabel>

              <Select
                displayEmpty
                style={{ width: '100%' }}
                label={'Mandrin'}
                value={affaireDetails.mandrin}
                name="mandrin"
                onChange={handleChange}
                placeholder="Mandrin"
              >
                <MenuItem value={'QUARANTE'}>40</MenuItem>
                <MenuItem value={'SOIXANTE'}>60</MenuItem>
                <MenuItem value={'AUTRE'}>Autre</MenuItem>
              </Select>

              <FormHelperText>{formErrors.mandrin}</FormHelperText>
            </FormControl>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ImpressionDetails;

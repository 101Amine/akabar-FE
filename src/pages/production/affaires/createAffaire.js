import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputLabel,
  Grid,
  Box,
  Divider,
  CardContent,
  Card,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import BackButton from '../../../components/BackButton';
import { createAffaireValidationSchema } from '../../../utils/validationService';
import {
  addAffaire,
  clearAffaireDetails,
  setAffaireDetails,
} from '../../../redux/affaireSlice';

const CreateAffaire = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { affaireDetails, submitting, error, success } = useSelector(
    (state) => state.affaire,
  );
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);
  const booleanGroups = [
    'avecImpression',
    'typeSortie',
    'repiquage',
    'vernis',
    'dorure',
    'plasification',
    'existanceDeRayonDeCoin',
  ];
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedMandarin, setSelecteMandarin] = useState('');
  const [selectedSortie, setSelectedSortie] = useState('');
  const [selectedImpression, setSelectedImpression] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('non');
  const [radioValues, setRadioValues] = useState({
    type: '',
    avecImpression: '',
    typeSortie: '',
    repiquage: '',
    vernis: '',
    dorure: '',
    plasification: '',
    existanceDeRayonDeCoin: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    console.log('affaireDetails', affaireDetails);
  }, [affaireDetails]);

  const getSortieDirection = (direction, position) => {
    console.log('position', position);
    const positionNumber = parseInt(position.replace('N_', ''), 10);

    console.log('EXT_${positionNumber}', `EXT_${positionNumber}`);
    console.log('INT_${positionNumber}', `INT_${positionNumber}`);
    return direction === 'Externe'
      ? `EXT_${positionNumber}`
      : `INT_${positionNumber}`;
  };

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      console.log('name', name);
      console.log('value', value);

      if (name === 'supportPapier') {
        const newSortieDirection = getSortieDirection(
          radioValues.typeSortie,
          value,
        );

        console.log('newSortieDirection', newSortieDirection);
        setSelectedSortie(newSortieDirection);
        dispatch(
          setAffaireDetails({
            ...affaireDetails,
            sortieDirection: newSortieDirection,
          }),
        );
      } else if (value === '') {
        dispatch(setAffaireDetails({ ...affaireDetails, [name]: value }));
      } else {
        const numericValue = Number(value);
        dispatch(
          setAffaireDetails({ ...affaireDetails, [name]: numericValue }),
        );
      }
    },
    [affaireDetails, radioValues, dispatch],
  );

  const handleRadioChange = (groupName) => (event) => {
    const value = event.target.value;

    setRadioValues((prevValues) => ({
      ...prevValues,
      [groupName]: value,
    }));

    // Determine if the value should be a boolean or remain as a string.
    const shouldConvertToBoolean = booleanGroups.includes(groupName);

    console.log('shouldConvertToBoolean', shouldConvertToBoolean);
    console.log('groupName', groupName);
    const dispatchedValue = shouldConvertToBoolean ? value === 'oui' : value;

    // Special handling for 'typeSortie' as it requires additional logic.

    console.log('groupName', groupName);
    if (groupName === 'typeSortie' && selectedSortie) {
      const newSortieDirection = getSortieDirection(
        dispatchedValue,
        selectedSortie,
      );

      console.log('newSortieDirection', newSortieDirection);
      setSelectedSortie(newSortieDirection);
      dispatch(
        setAffaireDetails({
          ...affaireDetails,
          sortieDirection: newSortieDirection,
        }),
      );
    } else {
      // Dispatch the appropriate value to the store.
      dispatch(
        setAffaireDetails({ ...affaireDetails, [groupName]: dispatchedValue }),
      );
    }
  };

  // useEffect(() => {
  //   dispatch(clearAffaireDetails());
  // }, [dispatch]);

  useEffect(() => {
    if (success) {
      handleSnackbarOpen('Affaire ajouté avec succès !', 'success');
      router.push('/production/affaires');
    } else if (error) {
      handleSnackbarOpen(
        "Échec de l'ajout d'une affaire. Veuillez réessayer.",
        'error',
      );
    }
  }, [success, error]);

  const handleSubmit = useCallback(
    (event) => {
      console.log('test');
      event.preventDefault();
      dispatch(addAffaire(affaireDetails));
    },
    [affaireDetails, dispatch],
  );

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Container
      maxWidth={isIconOnly ? 'false' : 'xl'}
      style={{ marginLeft: isIconOnly ? '-100px' : '50px', marginTop: '50px' }}
    >
      <BackButton />
      <Box marginTop={8}>
        <Typography variant="h4" gutterBottom marginTop="50px">
          Nouvelle affaire{' '}
        </Typography>
        <Divider />

        <Card
          style={{
            marginTop: '2em',
            marginBottom: '1em',
          }}
        >
          <CardContent>
            <Typography variant="h6" marginBottom="0.5em">
              Type d'etiquette :
            </Typography>

            <RadioGroup
              row
              value={radioValues.type}
              onChange={handleRadioChange('type')}
            >
              <Grid container spacing={3}>
                <Grid item>
                  <FormControlLabel
                    value="STANDARD"
                    control={<Radio />}
                    label="standard"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    value="PERSONNALISE"
                    control={<Radio />}
                    label="personalisé"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </CardContent>
        </Card>

        <div style={{ display: 'flex', gap: '50px', marginBlock: '35px' }}>
          <Card
            style={{ width: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          >
            <CardContent>
              <div
                style={{ display: 'flex', alignItems: 'center', flex: 0.35 }}
              >
                <TextField name="laize" label="LAIZE (EN MM)" margin="normal" />
                <Typography variant="h6" style={{ margin: '0 8px' }}>
                  X
                </Typography>
                <TextField
                  name="developee"
                  label="DEVELOPPE (EN MM)"
                  margin="normal"
                  onChange={handleChange}
                />
              </div>

              <div>
                <TextField
                  name="quantiteUnitaire"
                  label="Quantité Unitaire"
                  type="number"
                  margin="normal"
                  width="100%"
                  onChange={handleChange}
                />
              </div>

              <FormControl
                style={{ flex: 0.35, width: '100%' }}
                margin="normal"
                name="supportPapier"
                onChange={handleChange}
              >
                <Typography
                  variant="subtitle2"
                  marginBottom="0.5em"
                  marginLeft="0.5em"
                  opacity="0.6"
                >
                  Support (PAPIER)
                </Typography>

                <Select
                  displayEmpty
                  name="supportPapier"
                  onChange={handleChange}
                  placeholder="Support (PAPIER)"
                >
                  <MenuItem value="PAPIER_ADHESIF_THERMIQUE_ECO">
                    papier adhesif thermique eco
                  </MenuItem>
                  <MenuItem value="PAPIER_ADHESIF_THERMIQUE_1_ER_CHOIX">
                    papier adhesif thermique 1 er choix
                  </MenuItem>
                  <MenuItem value="PAPIER_ADHESIF_THERMIQUE_AVEC_COLLE_TRES_FORTE">
                    papier adhesif thermique avec colle tres forte
                  </MenuItem>
                  <MenuItem value="PAPIER_ADHESIF_COUCHÉ_AVEC_COLLE_SIMPLE">
                    papier adhesif couche avec colle simple{' '}
                  </MenuItem>
                  <MenuItem value="PAPIER_ADHESIF_COUCHÉ_AVEC_COLLE_TRES_FORTE">
                    papier adhesif couche avec colle tres forte{' '}
                  </MenuItem>
                  <MenuItem value="FILMS_PP_TRANSPARENT">
                    films pp transparent{' '}
                  </MenuItem>
                  <MenuItem value="FILMS_PP_BLANC_PVC">
                    {' '}
                    pilms pp blanc (pvc){' '}
                  </MenuItem>
                  <MenuItem value="PAPIER_THERMIQUE_COMPOSTABLE_BIODEGRADABLE">
                    papier thermique compostable biodegradable
                  </MenuItem>
                  <MenuItem value="PAPIER_FRUI_TAG_THERMIQUE">
                    papier frui tag thermique
                  </MenuItem>
                  <MenuItem value="AUTRE">autre</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                style={{ width: '100%' }}
                margin="normal"
                name="format"
                onChange={handleChange}
              >
                <Typography
                  variant="subtitle2"
                  marginBottom="0.5em"
                  marginLeft="0.5em"
                  opacity="0.6"
                >
                  Format
                </Typography>

                <Select displayEmpty name="format" onChange={handleChange}>
                  <MenuItem value="CARREE">CAR (CARREE)</MenuItem>
                  <MenuItem value="RECTANGULAIRE">REC (RECTANGULAIRE)</MenuItem>
                  <MenuItem value="OVALE">OV (OVALE)</MenuItem>
                  <MenuItem value="SPECIALE">SP ( SPECIALE)</MenuItem>
                  <MenuItem value="TRIANGULAIRE">
                    TRIA ( (TRIANGULAIRE)
                  </MenuItem>
                  <MenuItem value="AUTRE">Autre</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>

          <Card
            style={{ width: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          >
            <CardContent>
              <FormControl
                component="fieldset"
                margin="normal"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h3"
                  style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}
                >
                  Impression
                </Typography>
                <RadioGroup
                  value={radioValues.avecImpression}
                  onChange={handleRadioChange('avecImpression')}
                  row
                >
                  <Grid container spacing={3}>
                    <Grid item>
                      <FormControlLabel
                        value="oui"
                        control={<Radio />}
                        label="Oui"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        value="non"
                        control={<Radio />}
                        label="Non"
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {radioValues.avecImpression && (
                  <RadioGroup
                    value={radioValues.impressionSide}
                    onChange={handleRadioChange('impressionSide')}
                    row
                  >
                    <Grid container spacing={1}>
                      <Grid item>
                        <FormControlLabel
                          value="RECTO"
                          control={<Radio />}
                          label="Recto"
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          value="VERSO"
                          control={<Radio />}
                          label="Verso"
                        />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                )}
              </div>

              {radioValues.avecImpression && (
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Nbr couleur"
                    type="number"
                    name="colorNumber"
                    onChange={handleChange}
                    value={affaireDetails.colorNumber}
                    inputProps={{ min: '1', max: '8', step: '1' }}
                    margin="normal"
                  />
                </FormControl>
              )}
            </CardContent>
          </Card>
        </div>

        <Divider />
        {affaireDetails.avecImpression && (
          <Grid>
            <Card
              style={{
                marginBottom: '1em',
                marginTop: '2em',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sens de sortie :
                </Typography>
                <RadioGroup
                  row
                  value={radioValues.typeSortie}
                  onChange={handleRadioChange('typeSortie')}
                  name="sortieType"
                >
                  <FormControlLabel
                    value="Externe"
                    control={<Radio />}
                    label="Externe"
                  />
                  <FormControlLabel
                    value="Interne"
                    control={<Radio />}
                    label="Interne"
                  />
                </RadioGroup>

                <FormControl margin="normal" fullWidth>
                  {!selectedSortie && (
                    <InputLabel shrink={false}>Position</InputLabel>
                  )}
                  <Select
                    displayEmpty
                    name="supportPapier"
                    value={
                      selectedSortie
                        ? selectedSortie
                            .replace('EXT_', 'N_')
                            .replace('INT_', 'N_')
                        : ''
                    }
                    onChange={handleChange}
                    placeholder="Sélectionner position"
                  >
                    {radioValues.typeSortie === 'Externe'
                      ? ['N_1', 'N_2', 'N_3', 'N_4'].map((value) => (
                          <MenuItem key={value} value={value}>
                            N: {value.split('_')[1]}
                          </MenuItem>
                        ))
                      : ['N_5', 'N_6', 'N_7', 'N_8'].map((value) => (
                          <MenuItem key={value} value={value}>
                            N: {value.split('_')[1]}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>

                <Typography
                  ariant="h3"
                  style={{
                    fontWeight: 600,
                    fontSize: 18,
                    marginBottom: 10,
                    marginTop: 10,
                  }}
                >
                  Poses d'etiquette :
                </Typography>
                <RadioGroup
                  row
                  value={radioValues.sortieDirection}
                  onChange={handleRadioChange('sortieDirection')}
                >
                  <FormControlLabel
                    value="Externe"
                    control={<Radio />}
                    label="Auto"
                  />
                  <FormControlLabel
                    value="Interne"
                    control={<Radio />}
                    label="Manuelle"
                  />
                </RadioGroup>

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
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            value="non"
                            control={<Radio />}
                            label="Non"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
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
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            value="non"
                            control={<Radio />}
                            label="Non"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
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
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            value="non"
                            control={<Radio />}
                            label="Non"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
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
                    <RadioGroup
                      row
                      value={radioValues.plasification}
                      onChange={handleRadioChange('plasification')}
                    >
                      <Grid container spacing={1}>
                        <Grid item>
                          <FormControlLabel
                            value="oui"
                            control={<Radio />}
                            label="Oui"
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            value="non"
                            control={<Radio />}
                            label="Non"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
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
                      Existance de rayon de coin
                    </Typography>
                    <RadioGroup
                      row
                      value={
                        affaireDetails.format === 'OVALE' ||
                        affaireDetails.format === 'RONDE'
                          ? 'non'
                          : radioValues.existanceDeRayonDeCoin
                      }
                      onChange={handleRadioChange('existanceDeRayonDeCoin')}
                    >
                      <Grid container spacing={1}>
                        <Grid item>
                          <FormControlLabel
                            value="oui"
                            control={<Radio />}
                            label="Oui"
                            disabled={
                              affaireDetails.format === 'OVALE' ||
                              affaireDetails.format === 'RONDE'
                            }
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            value="non"
                            control={<Radio />}
                            label="Non"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
                  <TextField
                    label="Nbr Etq / bobine"
                    name="nbrEtqParBobine"
                    type="number"
                    margin="normal"
                    onChange={handleChange}
                  />
                  <TextField
                    label="Nbr Etq/ de front"
                    name="nbrEtqDeFront"
                    type="number"
                    margin="normal"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <FormControl margin="normal" fullWidth>
                    {selectedMandarin && (
                      <Typography
                        variant="subtitle2"
                        marginBottom="0.5em"
                        marginLeft="0.5em"
                        opacity="0.6"
                      >
                        Mandarin
                      </Typography>
                    )}
                    {!selectedMandarin && (
                      <InputLabel shrink={false}>Mandarin</InputLabel>
                    )}
                    <Select
                      displayEmpty
                      value={selectedMandarin}
                      name="mandrin"
                      onChange={handleChange}
                      placeholder="Mandrin"
                    >
                      <MenuItem value={40}>40</MenuItem>
                      <MenuItem value={76}>76</MenuItem>
                      <MenuItem value="Autre">Autre</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </CardContent>
            </Card>
          </Grid>
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ marginBlock: 3, float: 'right' }}
          onClick={handleSubmit}
        >
          Enregistrer
        </Button>
      </Box>
    </Container>
  );
};

CreateAffaire.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateAffaire;

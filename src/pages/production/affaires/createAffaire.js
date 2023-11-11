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
  Grid,
  Box,
  Divider,
  CardContent,
  Card,
  List,
  ListItem,
  ListItemText,
  CardHeader,
  Icon,
  FormHelperText,
  InputLabel,
  ListItemIcon,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import BackButton from '../../../components/BackButton';
import {
  addAffaire,
  clearAffaireDetails,
  setAffaireDetails,
} from '../../../redux/affaireSlice';
import SortieSelectionCard from './senseSortieCheckBoxes';
import { creeateAffaireValidationSchema } from '../../../utils/validationService';
import { fetchWithHeaders } from '../../../utils/api';
import AudioRecorder from '../../../components/AudioRecorder';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Loader from '../../../components/Loader';

const CreateAffaire = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { affaireDetails, submitting, error, success, loading } = useSelector(
    (state) => state.affaire,
  );
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);
  const booleanGroups = [
    'avecImpression',
    // 'typeSortie',
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
    poseEtiquette: '',
    typeSortie: '',
    repiquage: '',
    vernis: '',
    dorure: '',
    plasification: '',
    existanceDeRayonDeCoin: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const getSortieDirection = (direction, position) => {
    const positionNumber = parseInt(position.replace('N_', ''), 10);

    return direction === 'Externe'
      ? `EXT_${positionNumber}`
      : `INT_${positionNumber}`;
  };

  const handleChange = useCallback(
    (event) => {
      const { name, value, checked, type } = event.target;

      console.log('name', name);
      console.log('value', value);
      if (type === 'checkbox') {
        // Condition to check if the checkbox is checked
        if (checked) {
          const newSortieDirection = getSortieDirection(
            radioValues.typeSortie,
            name,
          );

          setSelectedSortie(newSortieDirection);

          dispatch(
            setAffaireDetails({
              ...affaireDetails,
              sortieDirection: newSortieDirection,
            }),
          );
        }
      } else if (name === 'typeSortie') {
        const newSortieDirection = getSortieDirection(
          radioValues.typeSortie,
          value,
        );

        console.log('typeSortie : ', newSortieDirection);
        setSelectedSortie(newSortieDirection);
        dispatch(
          setAffaireDetails({
            ...affaireDetails,
            sortieDirection: newSortieDirection,
          }),
        );
      } else {
        dispatch(setAffaireDetails({ ...affaireDetails, [name]: value }));
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
    const shouldConvertToBoolean = booleanGroups.includes(groupName);

    const dispatchedValue = shouldConvertToBoolean ? value === 'oui' : value;

    if (groupName === 'typeSortie' && selectedSortie) {
      const newSortieDirection = getSortieDirection(
        dispatchedValue,
        selectedSortie,
      );

      setSelectedSortie(newSortieDirection);
      dispatch(
        setAffaireDetails({
          ...affaireDetails,
          sortieDirection: newSortieDirection,
        }),
      );
    } else {
      dispatch(
        setAffaireDetails({ ...affaireDetails, [groupName]: dispatchedValue }),
      );
    }
  };

  const onRecordingComplete = async (audioBlob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');

    try {
      const response = await fetchWithHeaders('/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully');
      } else {
        alert('Error uploading file');
      }
    } catch (error) {
      alert('Error uploading file');
    }
  };

  const SortiePositions =
    radioValues?.typeSortie === 'Externe'
      ? ['N_1', 'N_2', 'N_3', 'N_4']
      : ['N_5', 'N_6', 'N_7', 'N_8'];

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      creeateAffaireValidationSchema
        .validate(affaireDetails, { abortEarly: false })
        .then(() => {
          // If validation is successful
          dispatch(addAffaire(affaireDetails));
          dispatch(clearAffaireDetails());
          handleSnackbarOpen('Affaire ajouté avec succès !', 'success');
          router.push('/production/affaires');
        })
        .catch((err) => {
          handleSnackbarOpen(
            "Échec de l'ajout d'une affaire. Veuillez réessayer.",
            'error',
          );
          let errors = {};
          err.inner.forEach((error) => {
            console.log('error', error);
            errors[error.path] = error.message;
          });
          setFormErrors(errors);
        });
    },
    [affaireDetails, dispatch, router, success, error],
  );

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Container
      maxWidth={isIconOnly ? 'false' : 'xl'}
      style={{
        marginLeft: isIconOnly ? '-100px' : '50px',
        marginTop: '50px',
        filter: loading ? 'blur(5px)' : '',
      }}
    >
      <BackButton />
      {loading && <Loader />}
      <Card
        style={{
          marginTop: '0em',
          marginBottom: '0em',
          width: '50%',
          marginLeft: 'auto',
        }}
      >
        <CardContent sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          {affaireDetails.clientName && (
            <>
              <div style={{ width: '50%' }}>
                <TextField
                  fullWidth
                  label="Client sélectionné"
                  value={
                    affaireDetails.clientName ? affaireDetails.clientName : ''
                  }
                  disabled
                  InputProps={{
                    style: {
                      color: 'black', // Change the text color
                      // Add any other styles you want to apply
                    },
                    // You can also style the underline if it's needed
                    disableUnderline: true, // If you want to remove the underline
                  }}
                />
              </div>
              <div>
                <DatePicker
                  value={
                    affaireDetails.date ? dayjs(affaireDetails.date) : dayjs()
                  }
                  label="Selected Date"
                  format="DD/MM/YYYY"
                  renderInput={(params) => <TextField {...params} disabled />}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <Box marginTop={8}>
        <Typography variant="h4" gutterBottom marginTop="50px">
          Nouvelle affaire{' '}
        </Typography>

        <Divider />

        <div style={{ display: 'flex', gap: '50px' }}>
          <Card
            style={{
              marginTop: '2em',
              marginBottom: '1em',
              width: '50%',
            }}
          >
            <CardContent>
              <TextField
                fullWidth
                label="Nom"
                value={affaireDetails.name}
                error={Boolean(formErrors.name)}
                helperText={formErrors.name}
                name="name"
                onChange={handleChange}
              />
            </CardContent>
          </Card>

          <Card
            style={{
              marginTop: '2em',
              marginBottom: '1em',
              width: '50%',
            }}
          >
            <CardContent>
              <Typography variant="h6" marginBottom="0.5em">
                Type d'etiquette :
              </Typography>

              <FormControl
                component="fieldset"
                error={Boolean(formErrors.type)}
              >
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
                <FormHelperText>{formErrors.type}</FormHelperText>
              </FormControl>
            </CardContent>
          </Card>
        </div>

        <div style={{ display: 'flex', gap: '50px', marginBlock: '35px' }}>
          <Card
            style={{ width: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          >
            <CardContent>
              <div
                style={{ display: 'flex', alignItems: 'center', flex: 0.35 }}
              >
                <TextField
                  name="laize"
                  label="LAIZE (EN MM)"
                  margin="normal"
                  onChange={handleChange}
                  error={Boolean(formErrors.laize)}
                  helperText={formErrors.laize}
                />
                <Typography variant="h6" style={{ margin: '0 8px' }}>
                  X
                </Typography>
                <TextField
                  name="developee"
                  label="DEVELOPPE (EN MM)"
                  margin="normal"
                  onChange={handleChange}
                  error={Boolean(formErrors.developee)}
                  helperText={formErrors.type}
                />

                <FormControl
                  style={{ width: '50%', marginLeft: '10px' }}
                  margin="normal"
                  name="format"
                  onChange={handleChange}
                  error={Boolean(formErrors.format)}
                  helperText={formErrors.format}
                >
                  <InputLabel>Forme</InputLabel>

                  <Select
                    displayEmpty
                    label={'Forme'}
                    name="format"
                    onChange={handleChange}
                  >
                    <MenuItem value="CARREE">CAR (CARREE)</MenuItem>
                    <MenuItem value="RECTANGULAIRE">
                      REC (RECTANGULAIRE)
                    </MenuItem>
                    <MenuItem value="OVALE">OV (OVALE)</MenuItem>
                    <MenuItem value="SPECIALE">SP ( SPECIALE)</MenuItem>
                    <MenuItem value="TRIANGULAIRE">
                      TRIA ( (TRIANGULAIRE)
                    </MenuItem>
                    <MenuItem value="AUTRE">Autre</MenuItem>
                  </Select>
                  <FormHelperText
                  // style={{ minHeight: formErrors.format ? '4em' : undefined }}
                  >
                    {formErrors.format}
                  </FormHelperText>
                </FormControl>
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <FormControl
                  style={{ width: '50%' }}
                  margin="normal"
                  error={Boolean(formErrors.support)}
                  helperText={formErrors.support}
                >
                  <InputLabel>Support (PAPIER)</InputLabel>

                  <Select
                    displayEmpty
                    label={'Support (PAPIER)'}
                    name="supportPapier"
                    value={affaireDetails.supportPapier}
                    onChange={handleChange}
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

                  <FormHelperText>{formErrors.support}</FormHelperText>
                </FormControl>

                <TextField
                  name="quantiteUnitaire"
                  label="Quantité Unitaire"
                  type="number"
                  margin="normal"
                  style={{ width: '50%' }}
                  onChange={handleChange}
                  error={Boolean(formErrors.quantiteUnitaire)}
                  helperText={formErrors.quantiteUnitaire}
                />
              </div>
            </CardContent>
          </Card>

          <Card
            style={{ width: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          >
            <CardContent>
              <FormControl
                error={Boolean(formErrors.avecImpression)}
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
                        checked={affaireDetails.avecImpression === true}
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        value="non"
                        control={<Radio />}
                        label="Non"
                        checked={affaireDetails.avecImpression === false}
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
                <FormHelperText>{formErrors.avecImpression}</FormHelperText>
              </FormControl>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {radioValues.avecImpression === 'oui' && (
                  <FormControl
                    component="fieldset"
                    error={Boolean(formErrors.impressionSide)}
                  >
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

                        <Grid item>
                          <FormControlLabel
                            value="RECTO_VERSO"
                            control={<Radio />}
                            label="Recto & Verso"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>

                    <FormHelperText
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                      {formErrors.impressionSide}
                    </FormHelperText>
                  </FormControl>
                )}
              </div>
              {radioValues.avecImpression === 'oui' && (
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Nbr couleur"
                    type="number"
                    name="colorNumber"
                    onChange={handleChange}
                    value={affaireDetails.colorNumber}
                    inputProps={{ min: '1', max: '8', step: '1' }}
                    margin="normal"
                    error={Boolean(formErrors.colorNumber)}
                    helperText={formErrors.colorNumber}
                  />
                </FormControl>
              )}
              <Card
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
              >
                {(radioValues.avecImpression === 'non' ||
                  !affaireDetails.avecImpression) && (
                  <>
                    <CardHeader
                      avatar={
                        <Icon>
                          <WarningAmberIcon sx={{ color: 'red' }} />
                        </Icon>
                      }
                      title="REMARQUE"
                      sx={{
                        backgroundColor: '#fffbe2',
                        color: '#173753',
                        fontSize: '0.6rem',
                        textAlign: 'right',
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        '.MuiCardHeader-title': {
                          fontSize: '0.88rem',
                        },
                      }}
                    />
                    <CardContent sx={{ padding: '0' }}>
                      <List
                        sx={{
                          width: '100%',
                          color: '#173753',
                          backgroundColor: '#fffbe2',
                          borderRadius: '10px',
                          padding: '20px',
                        }}
                      >
                        {[
                          'CETTE ETIQUETTE EST VIERGE NON IMPRIMEE',
                          'ABSENCE DES CLICHES D’IMPRESSION (OUTIL D’IMPRESSION)',
                          'ABSENCE DE BON A TIRER',
                        ].map((text, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <FiberManualRecordIcon
                                sx={{ fontSize: '10px', color: '#173753' }}
                              />{' '}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </>
                )}
              </Card>
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
                <SortieSelectionCard
                  sortieType={radioValues.typeSortie}
                  onSortieTypeChange={handleRadioChange('typeSortie')}
                  selectedPositions={
                    selectedSortie
                      ? [
                          selectedSortie
                            .replace('EXT_', 'N_')
                            .replace('INT_', 'N_'),
                        ]
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
                    <FormControlLabel
                      value="AUTO"
                      control={<Radio />}
                      label="Auto"
                    />
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
                      <FormHelperText>
                        {formErrors.Plastification}
                      </FormHelperText>
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

                          <FormControl
                            error={Boolean(formErrors.ExistanceRayon)}
                          >
                            <RadioGroup
                              row
                              value={affaireDetails.existanceDeRayonDeCoin}
                              onChange={handleRadioChange(
                                'existanceDeRayonDeCoin',
                              )}
                            >
                              <Grid container spacing={1}>
                                <Grid item>
                                  <FormControlLabel
                                    value="oui"
                                    control={<Radio />}
                                    label="Oui"
                                    checked={
                                      affaireDetails.existanceDeRayonDeCoin ===
                                      true
                                    }
                                  />
                                </Grid>
                                <Grid item>
                                  <FormControlLabel
                                    value="non"
                                    control={<Radio />}
                                    label="Non"
                                    checked={
                                      affaireDetails.existanceDeRayonDeCoin ===
                                      false
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

                {/*<AudioRecorder onRecordingComplete={onRecordingComplete} />*/}
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

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={snackbarSeverity}
            onClose={() => setSnackbarOpen(false)}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Container>
  );
};

CreateAffaire.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateAffaire;

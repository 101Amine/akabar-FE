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
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import BackButton from '../../../components/utils/BackButton';
import {
  addAffaire,
  clearAffaireDetails,
  fetchAffaires,
  setAffaireDetails,
} from '../../../redux/affaireSlice';
import { creeateAffaireValidationSchema } from '../../../utils/validationService';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Loader from '../../../components/utils/Loader';
import ImpressionDetails from '../../../components/Affaire/ImpressionDetails';
import CustomCardComponent from '../../../components/Affaire/CustomCardComponent';
import MediaBloc from '../../../components/Media/MediaBloc';
import PopupAffaire from '../../../components/Affaire/PopupAffaire';

const CreateAffaire = () => {
  // Redux dispatch and router hooks
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query; // Extracting ID from the URL
  const isUpdateMode = Boolean(id);

  // Redux state selectors
  const { affaireDetails, submitting, error, success, loading } = useSelector(
    (state) => state.affaire,
  );
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  const booleanGroups = [
    'avecImpression',
    'repiquage',
    'vernis',
    'dorure',
    'plasification',
    'existanceDeRayonDeCoin',
  ];
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [showNotification, setShowNotification] = useState(false);
  const [selectedSortie, setSelectedSortie] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    laize: '',
    developpe: '',
    forme: '',
  });

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

  useEffect(() => {
    if (affaireDetails.clientId) {
      sessionStorage.setItem('affaireDetails', JSON.stringify(affaireDetails));
    }
  }, [affaireDetails]);

  useEffect(() => {
    const storedAffaireDetails = sessionStorage.getItem('affaireDetails');
    if (storedAffaireDetails) {
      const affaireDetailsFromSession = JSON.parse(storedAffaireDetails);
      dispatch(setAffaireDetails(affaireDetailsFromSession));
    }
  }, []);
  const getSortieDirection = (direction, position) => {
    const positionNumber = parseInt(position.replace('N_', ''), 10);

    return direction === 'Externe'
      ? `EXT_${positionNumber}`
      : `INT_${positionNumber}`;
  };

  const handleChange = useCallback(
    (event) => {
      const { name, value, checked, type } = event.target;

      if (type === 'checkbox') {
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

  const fetchSuggestedAffaires = () => {
    if (formValues.laize && formValues.developpe && formValues.forme) {
      const filters = prepareFilters();

      const searchFilter = {
        searchCriteriaList: filters,
        dataOption: 'all',
      };
      dispatch(fetchAffaires(searchFilter))
        .then((response) => {
          // Check if response has data
          if (
            response.payload.currentPageData &&
            response.payload.currentPageData.length > 0
          ) {
            setShowNotification(true);
          } else {
            setShowNotification(false);
          }
        })
        .catch((error) => {
          // Handle the error
          console.error('Error fetching affaires:', error);
          setShowNotification(false);
        });
    }
  };

  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const prepareFilters = () => {
    let searchCriteriaList = [];

    if (formValues.laize && !isNaN(formValues.laize)) {
      searchCriteriaList.push({
        filterKey: 'laize',
        operation: 'ge',
        value: Number(formValues.laize) - 5,
        dataOption: 'all',
      });
      searchCriteriaList.push({
        filterKey: 'laize',
        operation: 'le',
        value: Number(formValues.laize) + 5,
        dataOption: 'all',
      });
    }

    if (formValues.developpe) {
      searchCriteriaList.push({
        filterKey: 'developpe',
        operation: 'ge',
        value: Number(formValues.developpe) - 5,
        dataOption: 'all',
      });
      searchCriteriaList.push({
        filterKey: 'developpe',
        operation: 'le',
        value: Number(formValues.developpe) + 5,
        dataOption: 'all',
      });
    }

    if (formValues.forme) {
      searchCriteriaList.push({
        filterKey: 'type',
        operation: 'eq',
        value: formValues.forme,
        dataOption: 'any',
      });
    }

    if (affaireDetails.clientId) {
      searchCriteriaList.push({
        filterKey: 'client.id',
        operation: 'eq',
        value: affaireDetails.clientId,
        dataOption: 'all',
      });
    }

    return searchCriteriaList;
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  const handleSubmitNotification = async () => {
    // Your form submission logic here
    // ...

    // Check with the backend if there are suggested 'affaires'
    const hasSuggestedAffaires = true; // Replace with actual backend call response
    if (hasSuggestedAffaires) {
      setShowNotification(true);
    }
  };

  const handleNotificationClick = () => {
    handleNotificationClose();
    setIsPopupOpen(true); // Open the popup
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

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
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box display={'flex'}>
                  <TextField
                    name="laize"
                    label="LAIZE (EN MM)"
                    margin="normal"
                    onChange={(e) => {
                      handleChange(e);
                      handleChangeForm(e);
                    }}
                    error={Boolean(formErrors.laize)}
                    helperText={formErrors.laize}
                  />
                  <Typography
                    variant="h6"
                    style={{ margin: '0 8px', marginBlock: 'auto' }}
                  >
                    X
                  </Typography>
                  <TextField
                    name="developpe"
                    label="DEVELOPPE (EN MM)"
                    margin="normal"
                    onChange={(e) => {
                      handleChange(e);
                      handleChangeForm(e);
                    }}
                    error={Boolean(formErrors.developpe)}
                    helperText={formErrors.type}
                  />

                  <FormControl
                    style={{ width: '50%', marginLeft: '10px' }}
                    margin="normal"
                    name="forme"
                    onChange={(e) => {
                      handleChange(e);
                      handleChangeForm(e);
                    }}
                    error={Boolean(formErrors.format)}
                    helperText={formErrors.format}
                  >
                    <InputLabel>Forme</InputLabel>

                    <Select
                      displayEmpty
                      label={'Forme'}
                      name="forme"
                      onChange={(e) => {
                        handleChange(e);
                        handleChangeForm(e);
                      }}
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
                    <FormHelperText>{formErrors.format}</FormHelperText>
                  </FormControl>
                </Box>

                {showNotification && (
                  <Box
                    sx={{
                      marginTop: 2,
                      padding: 2,
                      backgroundColor: '#f5f5f5',
                      borderRadius: '4px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <Typography variant="body1">
                      Vous avez des propositions d'affaires, cliquez ici pour en
                      voir plus.
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ cursor: 'pointer', color: '#6366F1' }}
                        onClick={handleNotificationClick}
                      >
                        Open
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ cursor: 'pointer' }}
                        onClick={handleNotificationClose}
                      >
                        X
                      </Typography>
                    </Box>
                  </Box>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={fetchSuggestedAffaires}
                >
                  Proposer une affaire similaire
                </Button>
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
          <>
            <ImpressionDetails
              affaireDetails={affaireDetails}
              radioValues={radioValues}
              handleRadioChange={handleRadioChange}
              handleChange={handleChange}
              formErrors={formErrors}
              selectedSortie={selectedSortie}
              SortiePositions={SortiePositions}
            />
            <CustomCardComponent />
          </>
        )}
        <MediaBloc handleChange={handleChange} />
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

        <PopupAffaire open={isPopupOpen} onClose={handlePopupClose} />
      </Box>
    </Container>
  );
};

CreateAffaire.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateAffaire;

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
  Checkbox,
  InputLabel,
  Grid,
  Box,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Layout as DashboardLayout } from '../../../layouts/dashboard/layout';
import BackButton from '../../../components/utils/BackButton';
import { useSelector } from 'react-redux';

const UpdateAffaire = () => {
  const router = useRouter();
  const { affaire: affaireJSON } = router.query;
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  const initialAffaireDetails = affaireJSON
    ? JSON.parse(affaireJSON)
    : {
        clientName: '',
        labelName: '',
        dimensions: {
          width: '',
          height: '',
        },
        unitQuantity: '',
        paperType: '',
        labelType: '',
        impression: '',
        colorNumber: '',
        impressionType: '',
        sortieType: '',
        sortie: '',
        labelPose: '',
        repiquage: '',
        vernis: '',
        dorure: '',
        plastification: '',
        labelsPerRoll: '',
        labelsPerFront: '',
        mandarin: '',
      };

  const [affaireDetails, setAffaireDetails] = useState(initialAffaireDetails);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [selectedOption, setSelectedOption] = useState('non');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedMandarin, setSelecteMandarin] = useState('');
  const [selectedSortie, setSelecteSortie] = useState('');
  const [selectedImpression, setSelectedImpression] = useState('');
  const [numberValue, setNumberValue] = useState('');

  useEffect(() => {
    if (affaireJSON) {
      setAffaireDetails(JSON.parse(affaireJSON));
    }
  }, [affaireJSON]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAffaireDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDimensionChange = (dimension) => (e) => {
    const value = e.target.value;
    setAffaireDetails((prevState) => ({
      ...prevState,
      dimensions: {
        ...prevState.dimensions,
        [dimension]: value,
      },
    }));
  };

  const handleRadioButtonChange = (name, value) => {
    setAffaireDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container
      maxWidth={isIconOnly ? 'false' : 'xl'}
      style={{ marginLeft: isIconOnly ? '-100px' : '50px' }}
    >
      {' '}
      <BackButton />
      <Box marginTop={8}>
        <Typography variant="h4" gutterBottom>
          Mise à jour de l'Affaire
        </Typography>
        <Divider />

        <Card style={{ width: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <TextField
              label="Nom de client"
              fullWidth
              margin="normal"
              value={affaireDetails.clientName}
              name="clientName"
              onChange={handleInputChange}
            />

            <div style={{ display: 'flex', gap: '50px' }}>
              <div style={{ width: '50%' }}>
                <TextField
                  label="Nom d'etiquette"
                  fullWidth
                  margin="normal"
                  value={affaireDetails.labelName}
                  name="labelName"
                  onChange={handleInputChange}
                />

                <div
                  style={{ display: 'flex', alignItems: 'center', flex: 0.35 }}
                >
                  <TextField
                    label="Width"
                    margin="normal"
                    value={affaireDetails.dimensions.width}
                    onChange={(e) =>
                      handleDimensionChange('width', e.target.value)
                    }
                  />

                  <Typography variant="h6" style={{ margin: '0 8px' }}>
                    X
                  </Typography>
                  <TextField
                    label="Height"
                    margin="normal"
                    value={affaireDetails.dimensions.height}
                    onChange={(e) =>
                      handleDimensionChange('height', e.target.value)
                    }
                  />
                </div>

                <div>
                  <TextField
                    label="Quantité Unitaire"
                    type="number"
                    margin="normal"
                    width="100%"
                    value={affaireDetails.unitQuantity}
                    name="unitQuantity"
                    onChange={handleInputChange}
                  />
                </div>

                <FormControl
                  style={{ flex: 0.35, width: '100%' }}
                  margin="normal"
                >
                  {selectedValue && (
                    <Typography
                      variant="subtitle2"
                      marginBottom="0.5em"
                      marginLeft="0.5em"
                      opacity="0.6"
                    >
                      Support (PAPIER)
                    </Typography>
                  )}
                  {!selectedValue && (
                    <InputLabel shrink={false}>Support (PAPIER)</InputLabel>
                  )}
                  <Select
                    displayEmpty
                    value={affaireDetails.paperType}
                    name="paperType"
                    onChange={handleInputChange}
                    placeholder="Support (PAPIER)"
                  >
                    <MenuItem value="Thermique">Thermique</MenuItem>
                    <MenuItem value="item2">Item 2</MenuItem>
                    <MenuItem value="item3">Item 3</MenuItem>
                  </Select>
                </FormControl>

                <Box
                  border="1px solid #7679da"
                  borderRadius="4px"
                  padding="1em"
                  marginBottom="1em"
                  marginTop="2em"
                >
                  <Typography variant="h6" marginBottom="0.5em">
                    Type d'etiquette :
                  </Typography>

                  <RadioGroup row>
                    <Grid container spacing={3}>
                      <Grid item>
                        <FormControlLabel
                          value="Standard"
                          control={<Radio />}
                          label="Standard"
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          value="Personalisé"
                          control={<Radio />}
                          label="Personalisé"
                        />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </Box>
              </div>

              <div
                style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <FormControl
                  component="fieldset"
                  margin="normal"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    ariant="h3"
                    style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}
                  >
                    Impression
                  </Typography>
                  <RadioGroup
                    onChange={(event) => setSelectedOption(event.target.value)}
                    value={selectedOption}
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

                <FormControl fullWidth margin="normal" style={{}}>
                  <TextField
                    label="Nbr couleur"
                    type="number"
                    value={affaireDetails.colorNumber}
                    name="colorNumber"
                    onChange={handleInputChange}
                    inputProps={{ min: '1', max: '8', step: '1' }}
                    margin="normal"
                  />
                </FormControl>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <RadioGroup
                    onChange={(event) =>
                      setSelectedImpression(event.target.value)
                    }
                    value={selectedImpression}
                    row
                  >
                    <Grid container spacing={1}>
                      <Grid item>
                        <FormControlLabel
                          value="recto"
                          control={<Radio />}
                          label="Recto"
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          value="verso"
                          control={<Radio />}
                          label="Verso"
                        />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Divider />

        <Card style={{ width: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <CardContent>
            {selectedOption === 'oui' && (
              <Box
                border="1px solid #7679da"
                borderRadius="4px"
                padding="1em"
                marginBottom="1em"
                marginTop="2em"
              >
                <Typography variant="h6" gutterBottom>
                  Sens de sortie :
                </Typography>
                <RadioGroup row>
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
                    <InputLabel shrink={false}>Choisir ...</InputLabel>
                  )}
                  <Select
                    displayEmpty
                    value={affaireDetails.sortie}
                    name="sortie"
                    onChange={handleInputChange}
                    placeholder="select..."
                  >
                    <MenuItem value={1}>N: 1</MenuItem>
                    <MenuItem value={2}>N: 2</MenuItem>
                    <MenuItem value={3}>N: 3</MenuItem>
                    <MenuItem value={4}>N: 4</MenuItem>
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
                  value={affaireDetails.labelPose}
                  onChange={(event) =>
                    handleRadioButtonChange('labelPose', event.target.value)
                  }
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Auto"
                  />
                  <FormControlLabel
                    value="false"
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
                      value={affaireDetails.repiquage}
                      onChange={(event) =>
                        handleRadioButtonChange('repiquage', event.target.value)
                      }
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
                      value={affaireDetails.vernis}
                      onChange={(event) =>
                        handleRadioButtonChange('vernis', event.target.value)
                      }
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
                      value={affaireDetails.dorure}
                      onChange={(event) =>
                        handleRadioButtonChange('dorure', event.target.value)
                      }
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
                      value={affaireDetails.plastification}
                      onChange={(event) =>
                        handleRadioButtonChange(
                          'plastification',
                          event.target.value,
                        )
                      }
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
                </div>

                <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
                  <TextField
                    label="Nbr Etq / bobine"
                    type="number"
                    margin="normal"
                    value={affaireDetails.labelsPerRoll}
                    name="labelsPerRoll"
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Nbr Etq/ de front"
                    type="number"
                    margin="normal"
                    value={affaireDetails.labelsPerFront}
                    name="labelsPerFront"
                    onChange={handleInputChange}
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
                      value={affaireDetails.mandarin}
                      name="mandarin"
                      onChange={handleInputChange}
                      placeholder="Mandarin"
                    >
                      <MenuItem value={40}>40</MenuItem>
                      <MenuItem value={76}>76</MenuItem>
                      <MenuItem value="Autre">Autre</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Box>
            )}
          </CardContent>
        </Card>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginBlock: 3, float: 'right' }}
        >
          Soumettre
        </Button>
      </Box>
    </Container>
  );
};

UpdateAffaire.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default UpdateAffaire;

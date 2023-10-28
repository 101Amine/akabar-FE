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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const CreateAffaire = () => {
  const [selectedOption, setSelectedOption] = useState('non');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedMandarin, setSelecteMandarin] = useState('');
  const [selectedSortie, setSelecteSortie] = useState('');
  const [selectedImpression, setSelectedImpression] = useState('');
  const [numberValue, setNumberValue] = useState('');

  const router = useRouter();
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  const handleChangeNumber = (event) => {
    const value = event.target.value;
    if (value >= 1 && value <= 8) {
      setNumberValue(value);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <Container
      maxWidth={isIconOnly ? 'false' : 'xl'}
      style={{ marginLeft: isIconOnly ? '-100px' : '50px', marginTop: '50px' }}
    >
      <Button
        onClick={handleBack}
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ position: 'absolute' }}
      >
        Back
      </Button>
      <Box marginTop={8}>
        <Typography variant="h4" gutterBottom marginTop="50px">
          Create Affaire
        </Typography>
        <Divider />

        <TextField label="Nom de client" fullWidth margin="normal" />

        <div style={{ display: 'flex', gap: '50px' }}>
          <div style={{ width: '50%' }}>
            <TextField label="Nom d'etiquette" fullWidth margin="normal" />

            <div style={{ display: 'flex', alignItems: 'center', flex: 0.35 }}>
              <TextField label="Width" margin="normal" />
              <Typography variant="h6" style={{ margin: '0 8px' }}>
                X
              </Typography>
              <TextField label="Height" margin="normal" />
            </div>

            <div>
              <TextField
                label="Quantité Unitaire"
                type="number"
                margin="normal"
                width="100%"
              />
            </div>

            <FormControl style={{ flex: 0.35, width: '100%' }} margin="normal">
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
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
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
            style={{ width: '50%', display: 'flex', flexDirection: 'column' }}
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
                onChange={handleChangeNumber}
                value={numberValue}
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
                onChange={(event) => setSelectedImpression(event.target.value)}
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

        <Divider />

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
                value={selectedSortie}
                onChange={(e) => setSelecteSortie(e.target.value)}
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
            <RadioGroup row>
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
                  style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}
                >
                  Repiquage
                </Typography>
                <RadioGroup row>
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
                  style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}
                >
                  Vernis
                </Typography>
                <RadioGroup row>
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
                  style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}
                >
                  Dorure
                </Typography>
                <RadioGroup row>
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
                  style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}
                >
                  Plastification
                </Typography>
                <RadioGroup row>
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
              />
              <TextField
                label="Nbr Etq/ de front"
                type="number"
                margin="normal"
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
                  onChange={(e) => setSelecteMandarin(e.target.value)}
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

CreateAffaire.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateAffaire;

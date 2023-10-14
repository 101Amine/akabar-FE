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
    Box
  } from '@mui/material';
  import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
  import { useState } from 'react';

  const CreateAffaire = () => {

    const [selectedOption, setSelectedOption] = useState('Standard'); 

    return (
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Create Affaire
        </Typography>
  
        <TextField label="Nom de client" fullWidth margin="normal" />
  
        <div style={{display: 'flex', gap: '50px'}}>
                <div style={{width: '50%'}}>
                    <TextField label="Nom d'etiquette" fullWidth margin="normal" />

                    <div style={{ display: 'flex', alignItems: 'center', flex: 0.35 }}>
                        <TextField label="Width" margin="normal" />
                        <Typography variant="h6" style={{ margin: '0 8px' }}>X</Typography>
                        <TextField label="Height"  margin="normal" />
                    </div>

                    <div>
                        <TextField label="Quantité Unitaire" type="number" margin="normal" />
                    </div>

                    <FormControl style={{ flex: 0.35 }} margin="normal">
                        <InputLabel>Support (PAPIER)</InputLabel>
                        <Select>
                        <MenuItem value="Thermique">Thermique</MenuItem>
                        </Select>
                    </FormControl>

                    <RadioGroup           
                      onChange={(event) => setSelectedOption(event.target.value)}
                      value={selectedOption}
                        row>
                            <Grid container spacing={3}>
                                <Grid item>
                                    <FormControlLabel value="Standard" control={<Radio />} label="Standard" />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel value="Personalisé" control={<Radio />} label="Personalisé" />
                                </Grid>
                            </Grid>
                        </RadioGroup>
                </div>

                <div style={{width: '50%', display: 'flex', flexDirection: 'column'}}>
                    <FormControl component="fieldset" margin="normal" 
                    style={{ 
                        display: 'flex',
                        alignItems: 'center'
                        }}>
                        <Typography ariant="h3" style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}>Impression</Typography>
                        <RadioGroup row>
                            <Grid container spacing={3}>
                                <Grid item>
                                    <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel value="non" control={<Radio />} label="Non" />
                                </Grid>
                            </Grid>
                        </RadioGroup>
                    </FormControl>

                    <FormControl fullWidth margin="normal" style={{ }}>
                        <TextField 
                        label="Nbr couleur" 
                        type="number" 
                        inputProps={{ min: '1', max: '8', step: '1' }} 
                        margin="normal"
                        />
                    </FormControl>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <FormControlLabel control={<Checkbox />} label="Recto" style={{ flex: 0.5 }} />
                        <FormControlLabel control={<Checkbox />} label="Verso" style={{ flex: 0.5 }} />
                    </div>
                </div>
        </div>



        {selectedOption === 'Personalisé' && (
        <Box sx={{marginTop: 5}}>
            <Typography variant="h5" gutterBottom>
            Sens de sortie:
            </Typography>
            <RadioGroup row>
                <FormControlLabel value="Externe" control={<Radio />} label="Externe" />
                <FormControlLabel value="Interne" control={<Radio />} label="Interne" />
            </RadioGroup>


            <Typography ariant="h3" style={{ fontWeight: 600, fontSize: 18, marginBottom: 10, marginTop: 10 }}>Poses d'etiquette</Typography>
            <RadioGroup row>
                <FormControlLabel value="Externe" control={<Radio />} label="Auto" />
                <FormControlLabel value="Interne" control={<Radio />} label="Manuelle" />
            </RadioGroup>

            <FormControl margin="normal" fullWidth>
                <InputLabel id="demo-simple-select-label">select...</InputLabel>
                <Select labelId="demo-simple-select-label" label="select...">
                    <MenuItem value={1}>N: 1</MenuItem>
                    <MenuItem value={2}>N: 2</MenuItem>
                    <MenuItem value={3}>N: 3</MenuItem>
                    <MenuItem value={4}>N: 4</MenuItem>
                </Select>
            </FormControl>

            <div style={{display: 'flex', gap: 100, marginTop: 20}}>
                <div>
                    <Typography ariant="h3" style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}>Repiquage</Typography>
                    <RadioGroup row>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel value="non" control={<Radio />} label="Non" />
                                        </Grid>
                                    </Grid>
                    </RadioGroup>
                </div>
                <div>
                    <Typography ariant="h3" style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}>Vernis</Typography>
                    <RadioGroup row>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel value="non" control={<Radio />} label="Non" />
                                        </Grid>
                                    </Grid>
                    </RadioGroup>
                </div>
                <div>
                    <Typography ariant="h3" style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}>Dorure</Typography>
                    <RadioGroup row>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel value="non" control={<Radio />} label="Non" />
                                        </Grid>
                                    </Grid>
                    </RadioGroup>
                </div>
                <div>
                    <Typography ariant="h3" style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}>Plastification</Typography>
                    <RadioGroup row>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel value="non" control={<Radio />} label="Non" />
                                        </Grid>
                                    </Grid>
                    </RadioGroup>
                </div>
            </div>


            <div style={{display: 'flex', gap: 20, marginTop: 20}}>
            <TextField label="Nbr Etq / bobine" type="number" margin="normal" />
            <TextField label="Nbr Etq/ de front" type="number" margin="normal" />

            <FormControl margin="normal" style={{width: '50%'}}>
                <InputLabel>Mandarin</InputLabel>
                <Select>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={76}>76</MenuItem>
                <MenuItem value="Autre">Autre</MenuItem>
                </Select>
            </FormControl>
      
            </div>



      </Box>
        )}

  
        <Button variant="contained" color="primary" sx={{marginBlock: 3, float: 'right'}}>
          Submit
        </Button>
      </Container>
    );
  };
  
  CreateAffaire.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default CreateAffaire;
  
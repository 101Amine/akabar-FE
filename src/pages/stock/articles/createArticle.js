import { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  TextField,
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  setClientDetails,
  addClient,
  clearClientDetails,
} from '../../../redux/clientSlice';
import { useRouter } from 'next/router';
import BackButton from '../../../components/BackButton';
import {
  createArticleValidationSchema,
  createClientValidationSchema,
} from '../../../utils/validationService';
import { addArticle } from '../../../redux/articleSlice';

const CreateArticle = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // State
  const { articleDetails, submitting, error, success } = useSelector(
    (state) => state.article,
  );

  // Local State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [formErrors, setFormErrors] = useState({});
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  // Handlers
  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      let updatedValue = value;

      if (name === 'name') {
        updatedValue = value.toUpperCase();
      }

      dispatch(
        setClientDetails({
          ...articleDetails,
          [name]: updatedValue,
        }),
      );
    },
    [articleDetails, dispatch],
  );

  useEffect(() => {
    dispatch(clearClientDetails());
  }, [dispatch]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      createArticleValidationSchema
        .validate(articleDetails, { abortEarly: false })
        .then(() => {
          // If validation is successful
          dispatch(addArticle(articleDetails));
          router.push('/stock/articles');
          handleSnackbarOpen('Article ajouté avec succès !', 'success');
        })
        .catch((err) => {
          handleSnackbarOpen(
            "Échec de l'ajout d'un article. Veuillez réessayer.",
            'error',
          );
          let errors = {};
          err.inner.forEach((error) => {
            errors[error.path] = error.message;
          });
          setFormErrors(errors);
        });
    },
    [articleDetails, dispatch, router, success, submitting],
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
        <Typography variant="h4" gutterBottom marginTop="80px">
          Créer un article{' '}
        </Typography>
        <Divider />
        <Box justifyContent="center" mt={4}>
          <Card
            style={{ width: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          >
            <CardContent>
              <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={3}
                  padding={2}
                  display="flex"
                  flexDirection="column"
                >
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      label="Code d'article"
                      name="code"
                      onChange={handleChange}
                      value={articleDetails.code}
                      error={Boolean(formErrors.code)}
                      helperText={formErrors.code}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      label="Nom d'article"
                      name="name"
                      onChange={handleChange}
                      required
                      value={articleDetails.name}
                      error={Boolean(formErrors.name)}
                      helperText={formErrors.name}
                    />
                  </Grid>
                </Grid>
                <Divider />
                <Box display="flex" justifyContent="flex-end" mt={2} mb={2}>
                  <Button variant="contained" color="primary" type="submit">
                    Enregistrer
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              severity={snackbarSeverity} // Use the snackbarSeverity state variable
              onClose={() => setSnackbarOpen(false)}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </Box>
      </Box>
    </Container>
  );
};

CreateArticle.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateArticle;

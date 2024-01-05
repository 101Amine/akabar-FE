import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Button,
  Grid,
  TextField,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useCreateForm } from '../../../hooks/useCreateForm';
import {
  addDevis,
  clearDevisDetails,
  setDevisDetails,
} from '../../../redux/devisSlice';
import GenericForm from '../../../components/Generics/GenericForm';
import BackButton from '../../../components/utils/BackButton';
import { createDevisValidationSchema } from '../../../utils/validationService';
import EditIcon from '@mui/icons-material/Edit';
import { SelectDialog } from '../../../components/Dialogs/selectDialog';
import { fetchClients } from '../../../redux/clientSlice';
import { ClientFilters } from '../../../sections/clients/client-filters';
import { useItemsFilters } from '../../../hooks/useItemsFilters';
import { fetchAffaires } from '../../../redux/affaireSlice';
import { useDevisDetailsHandler } from '../../../utils/handlers';
import { AffairesFilters } from '../../../sections/affaires/affaires-filters';
import { ArticleFilters } from '../../../sections/articles/article-filters';

import { useDialogs } from '../../../hooks/useDialog';
import { fetchArticles, setArticleDetails } from '../../../redux/articleSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useItemsFiltersV2 } from '../../../hooks/useItemsFiltersV2';

const redirectURL = '/ventes/devis';

const CreateDevis = () => {
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);
  const dispatch = useDispatch();
  const devisDetailsSelector = (state) => state.devis.devisDetails;

  const articleArrays = (state) => state?.devis?.devisDetails?.articles;

  const articleDetailsSelector = (state) => state.article.articleDetails;
  const devisDetails = useSelector(devisDetailsSelector);
  const articleDetails = useSelector(devisDetailsSelector);

  const devisDetailsHandler = useDevisDetailsHandler(devisDetails, dispatch);

  const {
    handleChange,
    handleSubmit,
    formErrors,
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    snackbarSeverity,
  } = useCreateForm(
    clearDevisDetails,
    addDevis,
    devisDetailsSelector,
    createDevisValidationSchema,
    setDevisDetails,
    redirectURL,
  );

  const handleChangeDevis = useCallback(
    (event) => {
      // Extracting name and value from the event object
      const { name, value } = event.target;

      // Logic to handle the change
      let updatedValue = name === 'name' ? value.toUpperCase() : value;

      dispatch(setArticleDetails({ ...articleDetails, [name]: updatedValue }));
    },
    [articleDetails, dispatch],
  );

  const initialDialogStates = {
    clients: false,
    affaires: false,
    articles: false,
  };
  const { openDialogs, handleCloseDialog, handleOpenDialog } =
    useDialogs(initialDialogStates);

  const [clientFilters, setClientFilters] = useState({
    nameClient: '',
    codeClient: '',
    ice: '',
  });
  const [affaireFilters, setAffaireFilters] = useState({
    'client.nameClient': '',
    name: '',
  });

  const [articleFilters, setArticleFilters] = useState({
    designation: '',
    code: '',
    family: '',
  });

  const [articles, setArticles] = useState([
    { id: 1, price: '', discount: '', tva: '' },
  ]);

  useEffect(() => {
    console.log('devisDetails', devisDetails);
  }, [devisDetails]);

  useEffect(() => {
    if (Array.isArray(articleArrays)) {
      setArticles(articleArrays);
    }
  }, [articleArrays]);

  useEffect(() => {
    dispatch(clearDevisDetails());
  }, []);

  const formFields = [
    {
      type: 'datePicker',
      name: 'Date',
      label: 'Choisir une date',
      error: Boolean(formErrors.agents),
      helperText: formErrors.agents,
    },
    {
      type: 'text',
      name: 'numero',
      label: 'Numero de devis',
      error: Boolean(formErrors.codeDevis),
      helperText: formErrors.codeDevis,
    },
    {
      type: 'text',
      name: 'name',
      label: 'Nom de devis',
      required: true,
      error: Boolean(formErrors.nameDevis),
      helperText: formErrors.nameDevis,
    },
    {
      type: 'select',
      name: 'agent',
      label: 'Choisir un agent',
      options: [
        { value: 'Agent X', label: 'Agent X' },
        { value: 'Agent Y', label: 'Agent Y' },
        { value: 'Agent W', label: 'Agent W' },
      ],
      error: Boolean(formErrors.agents),
      helperText: formErrors.agents,
    },
  ];

  const handleRowClientsClick = (client) => {
    handleCloseDialog('clients');
    devisDetailsHandler('clientName', client.nameClient);
  };

  const handleRowAfairesClick = (affaire) => {
    handleCloseDialog('affaires');
    devisDetailsHandler('affaire', affaire.name);
  };

  const handleRowArticlesClick = (article) => {
    handleCloseDialog('articles');

    const newArticle = {
      productId: article.id,
      price: article.priceHT,
      discount: '',
      tva: '',
    };

    const updatedArticles = Array.isArray(devisDetails.articles)
      ? [...devisDetails.articles, newArticle]
      : [newArticle];

    const updatedDevisDetails = {
      ...devisDetails,
      articles: updatedArticles,
    };

    devisDetailsHandler('articles', updatedDevisDetails);
  };

  const addArticle = () => {
    console.log('articles', articles);
    const newId =
      articles.length > 0 ? articles[articles.length - 1].id + 1 : 1;
    setArticles([
      ...(articles || []),
      { id: newId, price: '', discount: '', tva: '' },
    ]);
  };

  const removeArticle = (articleId) => {
    setArticles((articles || []).filter((article) => article.id !== articleId));
  };

  const { fetchFilteredItems: fetchFilteredClientsItems } = useItemsFilters({
    filters: clientFilters,
    setFilters: setClientFilters,
    dispatch,
    fetchAction: fetchClients,
  });

  const { fetchFilteredItems: fetchFilteredAffairesItems } = useItemsFilters({
    filters: affaireFilters,
    setFilters: setAffaireFilters,
    dispatch,
    fetchAction: fetchAffaires,
  });

  const { fetchFilteredItems: fetchFilteredArticlesItems } = useItemsFiltersV2({
    filters: articleFilters,
    setFilters: setArticleFilters,
    dispatch,
    fetchAction: fetchArticles,
  });

  return (
    <Container
      maxWidth={isIconOnly ? 'false' : 'xl'}
      style={{
        marginLeft: isIconOnly ? '-100px' : '50px',
        marginTop: '50px',
      }}
    >
      <BackButton />
      <Box marginTop={8}>
        <Typography variant="h4" gutterBottom sx={{ marginBlock: 5 }}>
          Créer un devis
        </Typography>

        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '30px',
            marginTop: '20px',
          }}
        >
          <Grid
            sx={{
              width: 'calc(50% - 15px)',
            }}
          >
            <Card
              style={{
                width: '100%',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              <CardContent>
                <GenericForm
                  fields={formFields}
                  values={devisDetails}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  noSubmit={true}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            sx={{
              width: 'calc(50% - 15px)',
            }}
          >
            <Card
              style={{
                width: '100%',
                height: '100%',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Box sx={{ display: 'flex', gap: '20px' }}>
                    {devisDetails.affaire && (
                      <TextField
                        sx={{ width: 'max(320px, 100%)' }}
                        label="Affaire sélectionné"
                        value={devisDetails.affaire ? devisDetails.affaire : ''}
                        error={Boolean(formErrors.affaire)}
                        helperText={formErrors.affaire}
                        // disabled
                      />
                    )}

                    <Button
                      onClick={() => handleOpenDialog('affaires')}
                      color="primary"
                      sx={{
                        backgroundColor: 'primary.main',
                        marginBlock: 'auto',
                        marginLeft: 'auto',
                        maxWidth: '100%',
                        width: '300px',
                        color: '#fff',
                        '&:hover': { backgroundColor: 'primary.dark' },
                      }}
                    >
                      {devisDetails.affaire ? (
                        <EditIcon sx={{ marginRight: '8px' }} />
                      ) : null}
                      {devisDetails.affaire
                        ? "Changer l'affaire"
                        : 'Sélectionner une affaire'}
                    </Button>
                  </Box>

                  <Box sx={{ display: 'flex', gap: '20px' }}>
                    {devisDetails.clientName && (
                      <TextField
                        label="Client sélectionné"
                        sx={{ width: 'max(320px, 100%)' }}
                        value={
                          devisDetails.clientName ? devisDetails.clientName : ''
                        }
                        error={Boolean(formErrors.clientName)}
                        helperText={formErrors.clientName}
                        // disabled
                      />
                    )}

                    <Button
                      onClick={() => handleOpenDialog('clients')}
                      color="primary"
                      sx={{
                        backgroundColor: 'primary.main',
                        marginBlock: 'auto',
                        marginLeft: 'auto',
                        maxWidth: '100%',
                        width: '300px',
                        color: '#fff',
                        '&:hover': { backgroundColor: 'primary.dark' },
                      }}
                    >
                      {devisDetails.clientName ? (
                        <EditIcon sx={{ marginRight: '8px' }} />
                      ) : null}
                      {devisDetails.clientName
                        ? 'Changer le client'
                        : 'Sélectionner un client'}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {articles?.map((article, index) => (
          <Grid
            key={article.id}
            sx={{ display: 'flex', gap: '20px', marginBlock: '20px' }}
          >
            <Card
              style={{
                width: '100%',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              <CardContent>
                <Button
                  onClick={() => handleOpenDialog('articles')}
                  color="primary"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: '#fff',
                    marginBlock: 'auto',
                    marginBottom: '20px',
                    '&:hover': { backgroundColor: 'primary.dark' },
                  }}
                >
                  <EditIcon sx={{ marginRight: '8px' }} />
                  Sélectionner un article
                </Button>

                <Grid sx={{ display: 'flex', gap: '20px' }}>
                  <TextField
                    fullWidth
                    label="Prix"
                    value={article.price}
                    name={`articles[${index}].price`}
                    onChange={handleChangeDevis}
                  />

                  <TextField
                    fullWidth
                    label="Réduction"
                    value={article.discount}
                    name={`articles[${index}].discount`}
                    onChange={handleChangeDevis}
                  />

                  <TextField
                    fullWidth
                    label="TVA"
                    value={article.tva}
                    name={`articles[${index}].tva`}
                    onChange={handleChangeDevis}
                  />
                </Grid>
              </CardContent>
            </Card>

            <Button
              sx={{
                marginBlock: 'auto',
              }}
              onClick={() => removeArticle(article.id)}
            >
              <RemoveIcon />
            </Button>
          </Grid>
        ))}

        <Button
          sx={{ display: 'flex', marginLeft: 'auto' }}
          onClick={addArticle}
        >
          <AddIcon />
        </Button>

        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: 5,
            width: 'max-content',
            paddingInline: 5,
            marginBlock: '50px',
            display: 'flex',
            marginLeft: 'auto',
          }}
        >
          Submit
        </Button>

        <SelectDialog
          openDialog={openDialogs.clients}
          setOpenDialog={() => handleOpenDialog('clients')}
          setCloseDialog={() => handleCloseDialog('clients')}
          fetchDataAction={fetchClients}
          filterComponent={ClientFilters}
          filters={clientFilters}
          setFilters={setClientFilters}
          dataSelector={(state) => state.client.clients}
          totalDataSelector={(state) => state.client.totalClients}
          columns={[
            { key: 'nameClient', label: 'Nom de client' },
            { key: 'codeClient', label: 'Code du client' },
            { key: 'ice', label: 'ICE' },
          ]}
          entity="client"
          pageTitle="Sélectionner un client"
          onItemSelect={handleRowClientsClick}
          fetchFilteredItems={fetchFilteredClientsItems}
        />

        <SelectDialog
          openDialog={openDialogs.affaires}
          setOpenDialog={() => handleOpenDialog('affaires')}
          setCloseDialog={() => handleCloseDialog('affaires')}
          fetchDataAction={fetchAffaires}
          filterComponent={AffairesFilters}
          filters={affaireFilters}
          setFilters={setClientFilters}
          dataSelector={(state) => state.affaire.affaires}
          totalDataSelector={(state) => state.affaire.totalAffaires}
          isAffaire={true}
          columns={[
            { key: 'name', label: 'Nom' },
            { key: 'clientName', label: 'Client' },
            { key: 'type', label: 'Type affaire' },
            { key: 'productType', label: 'Type produit' },
            { key: 'date', label: 'Date' },
            { key: 'status', label: 'Status' },
          ]}
          entity="affaire"
          pageTitle="Sélectionner une affaire"
          onItemSelect={handleRowAfairesClick}
          fetchFilteredItems={fetchFilteredAffairesItems}
        />

        <SelectDialog
          openDialog={openDialogs.articles}
          setOpenDialog={() => handleOpenDialog('articles')}
          setCloseDialog={() => handleCloseDialog('articles')}
          fetchDataAction={fetchArticles}
          filterComponent={ArticleFilters}
          filters={articleFilters}
          setFilters={setArticleFilters}
          dataSelector={(state) => state.article.articles}
          totalDataSelector={(state) => state.article.totalArticles}
          isArticle={true}
          columns={[
            { key: 'code', label: 'Code' },
            { key: 'name', label: 'Nom' },
            { key: 'family', label: 'Famille' },
            { key: 'unite', label: 'unité' },
            { key: 'priceHT', label: 'prix HT' },
          ]}
          entity="article"
          pageTitle="Sélectionner un article"
          onItemSelect={handleRowArticlesClick}
          fetchFilteredItems={fetchFilteredArticlesItems}
        />
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

CreateDevis.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateDevis;

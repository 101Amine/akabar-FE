import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Box,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import GenericForm from '../../../components/Generics/GenericForm';
import BackButton from '../../../components/utils/BackButton';
import { useCreateForm } from '../../../hooks/useCreateForm';
import { createArticleValidationSchema } from '../../../utils/validationService';
import {
  addArticle,
  updateArticle,
  getArticleDetails,
  clearArticleDetails,
  setArticleDetails,
  getArticleFamilies,
} from '../../../redux/articleSlice';
import { findOneEntity } from '../../../redux/utils/findOneEntity';

const ArticleForm = () => {
  // Initialize necessary hooks
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const isUpdateMode = Boolean(id); // Determine if it's update mode
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);
  const articleDetails = useSelector((state) => state.article.articleDetails);
  const families = useSelector((state) => state.article.families);
  const units = useSelector((state) => state.article.units);

  useEffect(() => {
    dispatch(getArticleFamilies());
    if (isUpdateMode) {
      dispatch(
        findOneEntity({
          entityType: 'article',
          url: '/stock/product/find',
          id,
        }),
      );
    } else {
      dispatch(clearArticleDetails());
    }
  }, [dispatch, id, isUpdateMode]);

  const {
    handleChange,
    handleSubmit,
    formErrors,
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    snackbarSeverity,
  } = useCreateForm(
    clearArticleDetails,
    isUpdateMode ? updateArticle : addArticle,
    (state) => state.article.articleDetails,
    createArticleValidationSchema,
    (details) => dispatch(setArticleDetails(details)),
    '/stock/articles',
  );

  const transformToLabelValueFormat = (array) => {
    return array.map((item) => ({ label: item, value: item }));
  };

  const transformedFamilies = transformToLabelValueFormat(families);
  const transformedUnits = transformToLabelValueFormat(units);

  const formFields = [
    {
      type: 'text',
      name: 'code',
      label: "Code d'article",
      error: Boolean(formErrors.code),
      helperText: formErrors.code,
    },
    {
      type: 'text',
      name: 'designation',
      label: "Nom d'article",
      required: true,
      error: Boolean(formErrors.name),
      helperText: formErrors.name,
    },
    {
      type: 'select',
      name: 'family',
      options: transformedFamilies,
      label: "Famille d'article",
      required: true,
      error: Boolean(formErrors.family),
      helperText: formErrors.family,
    },
    {
      type: 'select',
      name: 'unite',
      options: transformedUnits,
      label: 'unité',
      required: true,
      error: Boolean(formErrors.unite),
      helperText: formErrors.unite,
    },
    {
      type: 'number',
      name: 'priceHT',
      label: 'prixHT',
      required: true,
      error: Boolean(formErrors.priceHT),
      helperText: formErrors.priceHT,
    },
  ];

  return (
    <Container
      maxWidth={isIconOnly ? 'false' : 'xl'}
      style={{ marginLeft: isIconOnly ? '-100px' : '50px', marginTop: '50px' }}
    >
      <BackButton />
      <Box marginTop={8}>
        <Typography variant="h4" gutterBottom sx={{ marginBlock: 5 }}>
          {isUpdateMode ? 'Update' : 'Create'} Article
        </Typography>

        <Card
          style={{
            width: '50%',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginTop: 5,
          }}
        >
          <CardContent>
            <GenericForm
              fields={formFields}
              values={articleDetails}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
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

ArticleForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ArticleForm;

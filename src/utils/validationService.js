import * as Yup from 'yup';

export const createUserValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Nom est requis'),
  lastName: Yup.string().required('Prénom est requis'),
  password: Yup.string().required('Mot de passe est requis'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Email invalide',
    )
    .required('Email est requis'),
  mobilePhoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Seuls les chiffres sont autorisés')
    .required('Numéro de téléphone est requis'),
});

export const createAffaireValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nom de l'affaire est requis"),
});

export const createClientValidationSchema = Yup.object().shape({
  nameClient: Yup.string().required('Nom du client est requis'),

  // codeClient: Yup.string().required('Code du client est requis'),
  //
  // phone: Yup.string()
  //   .matches(/^[0-9]+$/, 'Seuls les chiffres sont autorisés')
  //   .length(10, 'Le numéro de téléphone doit comporter 10 chiffres'),
  //
  // fax: Yup.string().matches(/^[0-9]+$/, 'Seuls les chiffres sont autorisés'),
  //
  // ice: Yup.string().matches(/^[0-9]+$/, 'ICE du client est requis'),
  //
  // bankAccount: Yup.string().matches(
  //   /^[0-9]+$/,
  //   'Seuls les chiffres sont autorisés',
  // ),
  //
  // address: Yup.string().required('Adresse est requise'),
});

export const updateUserValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Nom est requis'),
  lastName: Yup.string().required('Prénom est requis'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Email invalide',
    )
    .required('Email est requis'),
  mobilePhoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Seuls les chiffres sont autorisés')
    .required('Numéro de téléphone est requis'),
});

export const updateClientlientValidationSchema = Yup.object().shape({
  nameClient: Yup.string().required('Nom du client est requis'),
  codeClient: Yup.string().required('Code du client est requis'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Seuls les chiffres sont autorisés')
    .length(10, 'Le numéro de téléphone doit comporter 10 chiffres'),
  fax: Yup.string().matches(/^[0-9]+$/, 'Seuls les chiffres sont autorisés'),
  ice: Yup.string().matches(/^[0-9]+$/, 'ICE du client est requis'),
  bankAccount: Yup.string().matches(
    /^[0-9]+$/,
    'Seuls les chiffres sont autorisés',
  ),
  address: Yup.string().required('Adresse est requise'),
});

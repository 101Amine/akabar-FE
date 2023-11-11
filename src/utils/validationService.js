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

export const affaireSelectionValidationSchema = Yup.object().shape({
  clientName: Yup.string().required('Le nom du client est requis'),
  productType: Yup.string().required("Le type d'affaire est requis"),
});

export const creeateAffaireValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Le nom de l’affaire est requis')
    .min(3, 'Le nom de l’affaire doit comporter au moins 3 caractères'),
  type: Yup.string().required(" Type d'etiquette est requis"),
  developee: Yup.string().required('developee est requis'),
  laize: Yup.string().required('laize est requis'),
  supportPapier: Yup.string().required(' Support (PAPIER) est requis'),
  quantiteUnitaire: Yup.string().required('quantite est requis'),
  format: Yup.string().required('Forme est requis'),
  avecImpression: Yup.string().required('avec Impression est requis'),
  impressionSide: Yup.string().required('Vous devez choisir une option'),
  colorNumber: Yup.string().required(
    'La couleur est obligatoire et doit être comprise entre 1 et 8.',
  ),
  sortieDirection: Yup.string().required(
    'Vous devez choisir une direction de sortie',
  ),
  poseEtiquette: Yup.string().required('pose etiquette est requis'),
  nbrEtqParBobine: Yup.string().required('Nombre de bobine est requis'),
  nbrEtqDeFront: Yup.string().required('Nombre de Etq Front est requis'),
  mandrin: Yup.string().required('Mandrin est requis'),
});

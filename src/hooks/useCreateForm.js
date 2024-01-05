import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export const useCreateForm = (
  clearDetailsAction,
  addEntityAction,
  entitySelector,
  validationSchema,
  setEntityDetails,
  redirectUrl,
) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Use the provided selector to fetch the state
  const entityState = useSelector(entitySelector);

  // Local state for form errors and snackbar
  const [formErrors, setFormErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Handlers
  const handleChange = useCallback(
    (firstArg, secondArg) => {
      let name, value, type;

      if (typeof firstArg === 'object' && firstArg.target) {
        // If the first argument is an event object, extract name, value, and type
        ({ name, value, type } = firstArg.target);
      } else if (typeof firstArg === 'string' && secondArg !== undefined) {
        // If the first argument is a string and second argument is provided,
        // treat them as name and value respectively
        name = firstArg;
        value = secondArg;
      } else {
        // Handle other cases or throw an error if the arguments are not as expected
        console.error('Invalid arguments passed to handleChange');
        return;
      }

      // Check if the field is a number and value is negative
      if (type === 'number' && parseFloat(value) < 0) {
        value = 0; // Set it to 0 or any other default positive value
      }

      // Logic to handle the change
      let updatedValue = name === 'name' ? value.toUpperCase() : value;

      dispatch(setEntityDetails({ ...entityState, [name]: updatedValue }));
    },
    [entityState, dispatch],
  );
  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      validationSchema
        .validate(entityState, { abortEarly: false })
        .then(() => {
          dispatch(addEntityAction(entityState));
          router.push(redirectUrl);
          handleSnackbarOpen('Entity added successfully!', 'success');
        })
        .catch((err) => {
          handleSnackbarOpen(
            'Failed to add entity. Please try again.',
            'error',
          );
          let errors = {};
          err.inner.forEach((error) => {
            errors[error.path] = error.message;
          });

          console.log('errors', errors);
          setFormErrors(errors);
        });
    },
    [entityState, dispatch, router],
  );

  useEffect(() => {
    dispatch(clearDetailsAction());
  }, [dispatch]);

  return {
    handleChange,
    handleSubmit,
    formErrors,
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    snackbarSeverity,
  };
};

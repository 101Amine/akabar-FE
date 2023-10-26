import { fetchWithHeaders, fetchWithHeadersLogin } from '../utils/api';

export const validateToken = async () => {
  const response = await fetchWithHeaders('/auth/validate-token', {
    method: 'GET',
  });
  if (response.status !== 200) {
    throw new Error('Token validation failed');
  }
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await fetchWithHeadersLogin('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  console.log('user data', response);

  if (response.status !== 200) {
    throw new Error('Error logging in');
  }

  return response.message;
};

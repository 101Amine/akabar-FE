const ROOT_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchWithHeaders = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${ROOT_URL}${endpoint}`, {
    method: 'POST',
    ...options,
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg);
  }

  return response.json();
};

export const fetchWithHeadersLogin = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${ROOT_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    const errorMsg = await response.json();
    throw new Error(errorMsg);
  }

  return response.json();
};

export const getUserInfo = async () => {
  return fetchWithHeaders('/user/info');
};

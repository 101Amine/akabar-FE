import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Appsignal from '@appsignal/javascript';

const clientSideEmotionCache = createEmotionCache();

const appsignal = new Appsignal({
  key: 'fbfa7f6c-39c9-42cc-bc82-43c6d2bf757f',
});

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  appsignal.demo();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <Provider store={store}>
      <Head>
        <title>Akabar</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthConsumer>
              {(auth) =>
                auth.isLoading ? (
                  <SplashScreen />
                ) : (
                  getLayout(<Component {...pageProps} />)
                )
              }
            </AuthConsumer>
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </Provider>
  );
};

export default App;

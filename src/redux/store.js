import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import { encryptTransform } from 'redux-persist-transform-encrypt';

const encryptor = encryptTransform({
  secretKey: 'B8n2!r4G&k7Mw$zP*l0V+-yF3qS6x#dE5tTc9oHp1u%jIeXr',
  onError: function (error) {
    // Handle the error.
    console.error('Encryption Error:', error);
  },
});

const authPersistConfig = {
  key: 'auth',
  storage,
  transforms: [encryptor],
};

const persistedReducer = persistReducer(authPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST'],
    },
  }),
});

export const persistor = persistStore(store, null, () => {});

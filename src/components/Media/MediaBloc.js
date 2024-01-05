import React from 'react';
import { Card, CardContent, TextField, Button, Grid } from '@mui/material';
import AudioRecorder from './AudioRecorder';
import ImageUploader from './ImageUploader';
import PDFUPloader from './PDFUploader';
import { fetchWithHeaders } from '../../utils/api';

const onRecordingComplete = async (audioBlob) => {
  const formData = new FormData();
  formData.append('file', audioBlob, 'recording.wav');

  try {
    const response = await fetchWithHeaders(
      '/upload/audio',
      {
        method: 'POST',
        body: formData,
      },
      true,
    );

    if (response.ok) {
      console.log('File uploaded successfully');
    }
  } catch (error) {
    console.error('Error uploading file');
  }
};
const MediaBloc = ({ handleChange }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          {' '}
          <Grid item xs={12} md={6}>
            {' '}
            <Card variant="outlined">
              <AudioRecorder onRecordingComplete={onRecordingComplete} />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            {' '}
            <Card variant="outlined">
              <ImageUploader />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            {' '}
            <TextField
              label="Informations Complémentaires"
              name={'texteInformatif'}
              onChange={handleChange}
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{ width: '100%', height: 'fit-content', marginBlock: '0' }}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {' '}
            <Card variant="outlined">
              <PDFUPloader />
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MediaBloc;

import React from 'react';
import { Card, CardContent, TextField, Button, Grid } from '@mui/material';
import AudioRecorder from './AudioRecorder';
import ImageUploader from './ImageUploader';
import PDFUPloader from './PDFUploader';
import { fetchWithHeaders } from '../utils/api';

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
      alert('File uploaded successfully');
    } else {
      alert('Error uploading file');
    }
  } catch (error) {
    alert('Error uploading file');
  }
};
const MediaBloc = ({ onDescriptionChange, onPDFUpload, handleChange }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          {' '}
          {/* Adjusted spacing to 3 (which is 24px) */}
          {/* Audio Recorder */}
          <Grid item xs={12} md={6}>
            {' '}
            {/* Adjusted to take half width on medium devices and up */}
            <Card variant="outlined">
              <AudioRecorder onRecordingComplete={onRecordingComplete} />
            </Card>
          </Grid>
          {/* Image Upload */}
          <Grid item xs={12} md={6}>
            {' '}
            {/* Adjusted to take half width on medium devices and up */}
            <Card variant="outlined">
              <ImageUploader />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            {' '}
            {/* Adjusted to take half width on medium devices and up */}
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
          {/* PDF Upload Section */}
          <Grid item xs={12} md={6}>
            {' '}
            {/* Adjusted to take half width on medium devices and up */}
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

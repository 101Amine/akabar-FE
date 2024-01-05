import React, { useState, useRef } from 'react';
import { Button, Card, IconButton, Box } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { ROOT_URL } from '../../utils/api';

function AudioRecorder({ onRecordingComplete }) {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const uploadAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');

    try {
      const response = await axios.post(`${ROOT_URL}/upload/audio`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        if (onRecordingComplete) {
          onRecordingComplete(audioBlob, response.data);
        }
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav',
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        await uploadAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.log('Error accessing audio device. Please check permissions.');
    }
  };
  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const handleDiscardRecording = () => {
    setAudioUrl(null);
    URL.revokeObjectURL(audioUrl);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '50px',
        margin: '20px',
      }}
    >
      {audioUrl && (
        <Box sx={{ display: 'flex' }}>
          <div>
            <audio src={audioUrl} controls />
          </div>
          <IconButton onClick={handleDiscardRecording}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{
          width: 'max-content',
          height: 'max-content',
          marginBlock: 'auto',
          marginLeft: 'auto',
        }}
        onClick={recording ? handleStopRecording : startRecording}
      >
        {recording ? "Arrêter l'enregistrement" : "Commencer l'enregistrement"}
      </Button>
    </Box>
  );
}

export default AudioRecorder;

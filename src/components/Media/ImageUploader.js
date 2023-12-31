import React, { useState } from 'react';
import { Button, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ImageUploader() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDiscardImage = () => {
    setImagePreviewUrl(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        margin: '20px',
      }}
    >
      {imagePreviewUrl && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={imagePreviewUrl}
            alt="Preview"
            style={{ width: '300px', height: '100%' }}
          />
          <IconButton onClick={handleDiscardImage}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}

      <Button
        variant="contained"
        component="label"
        sx={{
          width: 'max-content',
          height: 'max-content',
          marginBlock: 'auto',
          marginLeft: 'auto',
        }}
      >
        Télécharger l'image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      </Button>
    </Box>
  );
}

export default ImageUploader;

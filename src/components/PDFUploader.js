import React, { useState } from 'react';
import { Button, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function PDFUploader({ onPDFUpload }) {
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);

  const handlePDFChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDiscardPDF = () => {
    setPdfPreviewUrl(null);
  };

  const handleUploadPDF = async () => {
    // Implement the logic to handle the uploading of the PDF
    alert('PDF uploaded successfully!');
    // Reset the state if necessary
    setPdfPreviewUrl(null);
    // Additional logic for uploading the PDF
    if (onPDFUpload) {
      onPDFUpload(pdfPreviewUrl);
    }
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
      {pdfPreviewUrl && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <iframe
            src={pdfPreviewUrl}
            title="PDF Preview"
            style={{ width: '500px', height: '500px' }}
          />
          <IconButton onClick={handleDiscardPDF}>
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
        Télécharger le PDF
        <input
          type="file"
          hidden
          accept="application/pdf"
          onChange={handlePDFChange}
        />
      </Button>
    </Box>
  );
}

export default PDFUploader;

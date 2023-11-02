import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      startIcon={<ArrowBackIcon />}
      variant="outlined"
      sx={{ position: 'absolute' }}
    >
      Retour
    </Button>
  );
};

export default BackButton;

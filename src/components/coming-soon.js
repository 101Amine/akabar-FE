import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { ComingSoonLogo } from './coming-soon-logo';
import animationStyle from '../styles/animation.module.scss';

export const ComingSoon = () => {
  const [text, setText] = useState('');

  const fullText = 'Développement en cours...';

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < fullText.length) {
        setText((prevText) => prevText + fullText[index]);
        index++;
      } else {
        setText('');
        index = 0;
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <ComingSoonLogo />
      <Typography variant="h5" mt={2} className={animationStyle.typing}>
        Développement en cours...
      </Typography>
    </Box>
  );
};

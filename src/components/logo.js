import { useTheme } from '@mui/material/styles';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <svg version="1.0"
      width="35px" height="35px" viewBox="0 0 88.000000 79.000000"
      preserveAspectRatio="xMidYMid meet">

      <g transform="translate(0.000000,79.000000) scale(0.100000,-0.100000)"
      fill={fillColor} stroke="none">
      <path d="M410 611 c-14 -27 -11 -33 133 -276 123 -208 124 -210 158 -210 59 0
      51 27 -72 238 -159 272 -155 267 -184 267 -14 0 -29 -8 -35 -19z"/>
      <path d="M239 328 c-40 -68 -77 -135 -82 -149 -15 -38 -3 -59 33 -59 26 0 34
      7 58 50 l27 50 78 0 c64 0 80 3 98 21 18 18 19 23 6 42 -11 18 -26 23 -71 25
      l-56 3 26 44 c34 58 30 89 -12 93 -31 3 -34 -1 -105 -120z"/>
      </g>
      </svg>

  );
};

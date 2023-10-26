import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import FactoryIcon from '@mui/icons-material/DomainOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';

export const items = [
  {
    title: 'Accueil',
    path: '/',
    icon: <HomeOutlinedIcon fontSize="small" />,
  },
  {
    title: 'Ventes',
    path: '/ventes',
    icon: <AttachMoneyOutlinedIcon fontSize="small" />,
  },
  {
    title: 'Production',
    path: '/production',
    icon: <FactoryIcon fontSize="small" />,
  },
  {
    title: 'Outils',
    path: '/outils',
    icon: <BuildOutlinedIcon fontSize="small" />,
  },
];

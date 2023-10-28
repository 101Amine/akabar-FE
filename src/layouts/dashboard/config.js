import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import FactoryIcon from '@mui/icons-material/DomainOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';

const menuItems = {
  ventes: [
    { label: 'Clients', path: '/ventes/clients', icon: GroupIcon },
    { label: 'Affaires', path: '/ventes/affaires', icon: BusinessCenterIcon },
    { label: 'Devis', path: '/ventes/devis', icon: ReceiptIcon },
    { label: 'Commandes', path: '/ventes/commandes', icon: ShoppingCartIcon },
  ],
  production: [
    // For now, I'm leaving this empty as you didn't provide specific items.
    // But you can use icons like SettingsIcon for settings or configurations related to production.
  ],

  outils: [
    {
      label: 'Paramètres ',
      path: '/outils/parametres',
      icon: SettingsIcon,
    },
    {
      label: 'Utilisateurs',
      path: '/outils/utilisateurs',
      icon: PeopleIcon,
    },
  ],
};

export const items = [
  {
    title: 'Accueil',
    path: '/',
    icon: <HomeOutlinedIcon fontSize="small" />,
  },
  {
    title: 'Ventes',
    path: menuItems.ventes[0]?.path || '/ventes', // Pointing to the first side-nav route
    icon: <AttachMoneyOutlinedIcon fontSize="small" />,
  },
  {
    title: 'Production',
    path: menuItems.production[0]?.path || '/production', // Similarly, pointing to the first route or to the general path if no items
    icon: <FactoryIcon fontSize="small" />,
  },
  {
    title: 'Outils',
    path: menuItems.outils[0]?.path || '/outils',
    icon: <BuildOutlinedIcon fontSize="small" />,
  },
];

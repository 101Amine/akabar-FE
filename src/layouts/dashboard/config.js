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
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

export const menuItems = {
  ventes: [
    { label: 'Clients', path: '/ventes/clients', icon: GroupIcon },
    { label: 'Devis', path: '/ventes/devis', icon: ReceiptIcon },
    { label: 'Commandes', path: '/ventes/commandes', icon: ShoppingCartIcon },
    { label: 'Agents', path: '/ventes/agents', icon: RecordVoiceOverIcon },
  ],
  stock: [{ label: 'Articles', path: '/stock/articles', icon: CategoryIcon }],
  production: [
    {
      label: 'Affaires',
      path: '/production/affaires',
      icon: BusinessCenterIcon,
    },
  ],

  outils: [
    {
      label: 'Paramètres',
      path: '/outils/parametres',
      icon: SettingsIcon,
    },
    {
      label: 'Utilisateurs',
      path: '/outils/utilisateurs',
      pathCreate: '/outils/utilisateurs',
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
    path: menuItems.ventes[0]?.path || '/ventes',
    icon: <AttachMoneyOutlinedIcon fontSize="small" />,
  },
  {
    title: 'Production',
    path: menuItems.production[0]?.path || '/production',
    icon: <FactoryIcon fontSize="small" />,
  },
  {
    title: 'Outils',
    path: menuItems.outils[0]?.path || '/outils',
    icon: <BuildOutlinedIcon fontSize="small" />,
  },

  {
    title: 'Stock',
    path: menuItems.stock[0]?.path || '/stock',
    icon: <InventoryIcon fontSize="small" />,
  },
];

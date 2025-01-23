import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Paper,
} from '@mui/material';
import { Dashboard, People, Book, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import theme from '../theme';

interface SidebarProps {
  drawerWidth: number; 
}

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Reservations', icon: <Book />, path: '/reservations' },
    { text: 'Guests', icon: <People />, path: '/guests' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
   <Paper
  elevation={3}
  sx={{
    width: drawerWidth,
    height: 'calc(100vh - 20px)',
    position: 'fixed',
    top: '10px',
    left: '10px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[3],
  }}
>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem disablePadding key={item.text}>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Sidebar;

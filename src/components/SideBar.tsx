import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import { Menu, Dashboard, People, Book, Settings } from '@mui/icons-material';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); 

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Reservations', icon: <Book />, path: '/reservations' },
    { text: 'Guests', icon: <People />, path: '/guests' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 72 : 240,
        '& .MuiDrawer-paper': {
          width: collapsed ? 72 : 240,
          transition: 'width 0.3s',
        },
      }}
    >
      <IconButton
        onClick={() => setCollapsed(!collapsed)}
        sx={{ justifyContent: collapsed ? 'center' : 'flex-start', p: 2 }}
      >
        <Menu />
      </IconButton>
      <List>
        {menuItems.map((item) => (
          <Tooltip
            title={collapsed ? item.text : ''}
            placement="right"
            key={item.text}
          >
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {!collapsed && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

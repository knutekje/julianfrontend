import React from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';

interface DetailSidebarProps {
  details: unknown;
}

const DetailSidebar: React.FC<DetailSidebarProps> = ({ details }) => {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <Box sx={{ width: 320, padding: 2, borderLeft: '1px solid #d3d3d3' }}>
      <Tabs value={tabIndex} onChange={(_e, newIndex) => setTabIndex(newIndex)}>
        <Tab label="Overview" />
        <Tab label="History" />
        <Tab label="Actions" />
      </Tabs>
      <Box sx={{ marginTop: 2 }}>
        {tabIndex === 0 && (
          <Typography variant="body2">
            {details ? JSON.stringify(details, null, 2) : 'No details selected.'}
          </Typography>
        )}
        {tabIndex === 1 && <Typography>History Content</Typography>}
        {tabIndex === 2 && <Typography>Actions Content</Typography>}
      </Box>
    </Box>
  );
};

export default DetailSidebar;

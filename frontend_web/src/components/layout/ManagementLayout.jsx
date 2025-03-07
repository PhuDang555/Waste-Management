import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SideBarAdmin from '../common/SideBarAdmin';

const ManagementLayout = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh', 
        border: '2px solid #4FC3F7', 
        borderRadius: 2 
      }}
    >
      {/* Sidebar */}
      <SideBarAdmin />

      <Outlet />
      
    </Box>
  );
};

export default ManagementLayout;
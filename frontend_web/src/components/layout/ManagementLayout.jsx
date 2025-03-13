import { Box, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SideBarAdmin from '../common/SideBarAdmin';

const ManagementLayout = () => {
  return (
    <Box 
      sx={{ 
        // minHeight: '100vh',
        height:'100vh',
        border: '2px solid #4FC3F7', 
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {/* Sidebar */}
      <Grid container sx={{ height: '100%' }}>
        <Grid
          item
          xs={0}
          sm={4}
          md={3}
          lg={2.5}
          sx={{
            display: { xs: 'none', sm: 'block' }, // Ẩn trên xs, hiện từ sm trở lên
            height: '100%',
          }}
        >
          <SideBarAdmin />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={9}
          lg={9.5}
          sx={{
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </Box>
    
  );
};

export default ManagementLayout;
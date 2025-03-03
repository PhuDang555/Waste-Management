import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <Box
    component="main"
    sx={{
        flexGrow: 1,
        p: 3,
        height: "100vh",
    }}
    >
    <Outlet />
    </Box>
  );
};

export default AdminLayout;
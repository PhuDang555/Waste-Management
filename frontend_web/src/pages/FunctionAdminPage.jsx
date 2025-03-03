import { useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FunctionAdminPage = () => {
  const { user } = useSelector((state) => state.auth); 
  const navigate = useNavigate();

  
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: '#fef5e7', 
        p: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="body1" sx={{ color: '#1976d2', mr: 1 }}>
          {user?.full_name || 'ADMIN'} 
        </Typography>
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            bgcolor: '#1976d2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <Typography variant="caption">✔</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 3, 
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: 200,
            height: 100,
            borderRadius: 10,
            borderColor: '#1976d2',
            color: '#1976d2',
            fontSize: 18,
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#1565c0',
              color: '#1565c0',
            },
          }}
          onClick={() => handleNavigation('/user/data-input')}
        >
          NHẬP LIỆU
        </Button>

        <Button
          variant="outlined"
          sx={{
            width: 200,
            height: 100,
            borderRadius: 10,
            borderColor: '#1976d2',
            color: '#1976d2',
            fontSize: 18,
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#1565c0',
              color: '#1565c0',
            },
          }}
          onClick={() => handleNavigation('/user/report')}
        >
          THỐNG KÊ VÀ BÁO CÁO
        </Button>

        <Button
          variant="outlined"
          sx={{
            width: 200,
            height: 100,
            borderRadius: 10,
            borderColor: '#1976d2',
            color: '#1976d2',
            fontSize: 18,
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#1565c0',
              color: '#1565c0',
            },
          }}
          onClick={() => handleNavigation('/user/collect-manage')}
        >
          QUẢN TRỊ
        </Button>

        <Button
          variant="outlined"
          sx={{
            width: 200,
            height: 100,
            borderRadius: 10,
            borderColor: '#1976d2',
            color: '#1976d2',
            fontSize: 18,
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#1565c0',
              color: '#1565c0',
            },
          }}
          onClick={() => handleNavigation('/user/support')}
        >
          CHĂM SÓC KHÁCH HÀNG
        </Button>
      </Box>
    </Box>
  );
};

export default FunctionAdminPage;
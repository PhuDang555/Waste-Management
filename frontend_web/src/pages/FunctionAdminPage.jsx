import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Grid,
  Avatar
} from '@mui/material';
import { Link } from 'react-router-dom';

const FunctionAdminPage = () => {
  // Array of menu items
  const menuItems = [
    { id: 1, title: "NHẬP LIỆU", url: "/admin/data-input" },
    { id: 2, title: "THỐNG KÊ VÀ BÁO CÁO", url: "/admin/statistics-reports" },
    { id: 3, title: "QUẢN TRỊ", url: "/admin/management" },
    { id: 4, title: "CHĂM SÓC KHÁCH HÀNG", url: "/admin/customer-support" }
  ];

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '94vh',
        backgroundColor: '#FFF5E6',
        padding: 3,
        borderRadius: 4,
        border: '2px solid #4FC3F7',
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          marginBottom: 4
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar 
            sx={{ 
              width: 56, 
              height: 56,
              bgcolor: '#7B68EE' 
            }}
          >A</Avatar>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mt: 1,
              fontWeight: 'bold' 
            }}
          >
            ADMIN
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="md" sx={{ marginTop: 15 }}>
        <Grid container spacing={4}>
          {menuItems.map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <Paper
                elevation={3}
                sx={{
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                  cursor: 'pointer',
                  border: '1px solid #4FC3F7',
                  '&:hover': {
                    boxShadow: 6,
                    backgroundColor: '#F5FBFF'
                  }
                }}
              > 
                <Link to={item.url} style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#3498db',
                      textAlign: 'center'
                    }}
                  >
                    {item.title}
                  </Typography>
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FunctionAdminPage;
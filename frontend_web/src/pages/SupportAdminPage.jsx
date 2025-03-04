import {
  Badge,
  Box,
  Button,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SupportAdminPage = () => {
  
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const requestData = [
    { id: 1, title: 'YÊU CẦU TỪ SIÊU THỊ ABCDEFGH' },
    { id: 2, title: 'YÊU CẦU TỪ SIÊU THỊ IJKLMNOP' },
    { id: 3, title: 'YÊU CẦU TỪ SIÊU THỊ QRSTUVWX' },
    { id: 4, title: 'YÊU CẦU TỪ SIÊU THỊ YZ123456' },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, minHeight: "100vh", backgroundColor: '#FFF5E6',}}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab 
          label={
            <Badge badgeContent={3} color="error">
              <Typography color="#3498db">YÊU CẦU</Typography>
            </Badge>
          }
        />
        <Tab label={<Typography color="#3498db">PHẢN HỒI</Typography>} />
      </Tabs>
      <Box>
        {value === 0 && (
          <Box>
            {requestData.map((item) => (
              <Box 
                key={item.id}
                sx={{ 
                  minHeight: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'white',
                  border: '2px solid #3498db',
                  borderRadius: 4,
                  p:2,
                  mt:1,
                  
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: '#3498db',
                  }}
                >
                  {item.title}
                </Typography>
                <Button variant="contained" sx={{bgcolor: "#ff6347"}}>
                  <Link to={`/admin/customer-support/${item.id}`}>Xem chi tiết</Link>
                </Button>
              </Box>
            ))}
          </Box>
        )}
        {value === 1 && (
          <Box>
            {requestData.map((item) => (
              <Box 
                key={item.id}
                sx={{ 
                  minHeight: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'white',
                  border: '2px solid #3498db',
                  borderRadius: 4,
                  p:2,
                  mt:1,
                  
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: '#3498db',
                  }}
                >
                  {item.title}
                </Typography>
                <Button variant="contained" sx={{bgcolor: "#ff6347"}}>
                  Xem chi tiết
                </Button>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default SupportAdminPage;
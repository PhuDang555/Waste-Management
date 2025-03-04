import {
  Badge,
  Box,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const SupportDetailAdminPage = () => {
  const [status, setStatus] = useState('');
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const requestData = [
    { id: 1, title: 'YÊU CẦU TỪ SIÊU THỊ ABCDEFGH', content: 'Ive created a React component that matches the layout you showed:Uses MUI components (TextField and Button)Matches the color scheme with an orange buttonUses flexbox for responsive alignmentIncludes placeholder textResponsive design that centers the layoutWould you like me to explain any part of the code or make any modifications?' },
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
        {requestData.map((item) => (
          <Box 
            key={item.id}
            sx={{
              position:'relative',
              minHeight: '400px',
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
            <Typography
              sx={{
                color: '#3498db',
                mt:2,
              }}
            >
              Nội dung: {item.content}
            </Typography>
            <Select
                value={status}
                onChange={handleStatusChange}
                sx={{
                  bgcolor: "#ff6347",
                  color: 'white',
                  position: 'absolute',
                  right: '46%',
                  bottom: 10,
                  p:1,
                  width: '10%',
                  '& .MuiSelect-select': {
                    padding: '5px 10px',
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Chọn trạng thái
                </MenuItem>
                <MenuItem value="Đang xử lý">Đang xử lý</MenuItem>
                <MenuItem value="Đã xử lý">Đã xử lý</MenuItem>
              </Select>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default SupportDetailAdminPage;
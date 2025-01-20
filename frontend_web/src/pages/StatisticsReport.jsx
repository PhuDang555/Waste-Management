import { useState } from 'react';
import {
  Box,
  Paper,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableViewIcon from '@mui/icons-material/TableView';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsReport = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sourceAnchorEl, setSourceAnchorEl] = useState(null);
  const [typeAnchorEl, setTypeAnchorEl] = useState(null);

  // Chart Data
  const wasteTypesData = {
    labels: ['Nhựa', 'Kim loại', 'Giấy', 'Khác'],
    datasets: [{
      data: [50, 30, 15, 5],
      backgroundColor: [
        '#1976d2',
        '#2196f3',
        '#64b5f6',
        '#90caf9',
      ],
    }]
  };

  const plasticTypesData = {
    labels: ['Bao bì mềm', 'PET', 'HDPE', 'PP'],
    datasets: [{
      data: [40, 30, 10, 20],
      backgroundColor: [
        '#1976d2',
        '#2196f3',
        '#64b5f6',
        '#90caf9',
      ],
    }]
  };

  const processingData = {
    labels: ['Tái chế', 'Đồng xử lý'],
    datasets: [{
      data: [90, 10],
      backgroundColor: [
        '#1976d2',
        '#2196f3',
      ],
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, minHeight: "100vh"}}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 4 }}>
        {/* Source Selection */}
        <Box sx={{ p: 2 }}>
          <Button
            endIcon={<KeyboardArrowDownIcon />}
            fullWidth
            onClick={(e) => setSourceAnchorEl(e.currentTarget)}
            sx={{ bgcolor: '#26c6da', color: 'white', '&:hover': { bgcolor: '#00bcd4' } }}
          >
            CHỦ NGUỒN THẢI
          </Button>
          <Menu
            anchorEl={sourceAnchorEl}
            open={Boolean(sourceAnchorEl)}
            onClose={() => setSourceAnchorEl(null)}
          >
            <MenuItem>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Tất cả"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={<Checkbox />}
                label="Siêu thị ABC"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={<Checkbox />}
                label="Siêu thị ABC- CN1"
              />
            </MenuItem>
          </Menu>
        </Box>

        {/* Waste Type Selection */}
        <Box sx={{ p: 2 }}>
          <Button
            endIcon={<KeyboardArrowDownIcon />}
            fullWidth
            onClick={(e) => setTypeAnchorEl(e.currentTarget)}
            sx={{ bgcolor: '#26c6da', color: 'white', '&:hover': { bgcolor: '#00bcd4' } }}
          >
            LOẠI RÁC THẢI
          </Button>
          <Menu
            anchorEl={typeAnchorEl}
            open={Boolean(typeAnchorEl)}
            onClose={() => setTypeAnchorEl(null)}
          >
            <MenuItem>
              <FormControlLabel
                control={<Checkbox />}
                label="Rác thực phẩm"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={<Checkbox />}
                label="Rác tái chế"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Nhựa"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={<Checkbox />}
                label="Giấy"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={<Checkbox />}
                label="Kim loại"
              />
            </MenuItem>
          </Menu>
        </Box>

        {/* Time Selection */}
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            type="date"
            sx={{ 
            bgcolor: "white",
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0088cc"
            },
            "& .MuiInputBase-input": { 
                height: "0.4375em",
            },
            }}
          />
        </Box>

        {/* Statistics Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{  
            bgcolor: '#ff7043', 
            color: 'white', 
            '&:hover': { bgcolor: '#f4511e' },
            height: '40px',
            mt: 2
          }}
        >
          THỐNG KÊ
        </Button>
      </Box>

      {/* Charts Section */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, mt:10 }}>
        <Box sx={{ p: 2 }}>
          <Pie data={wasteTypesData} options={chartOptions} />
        </Box>
        <Box sx={{ p: 2 }}>
          <Pie data={plasticTypesData} options={chartOptions} />
        </Box>
        <Box sx={{ p: 2 }}>
          <Pie data={processingData} options={chartOptions} />
        </Box>
      </Box>

      {/* Export Button */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<PictureAsPdfIcon />}
          endIcon={<TableViewIcon />}
          sx={{ 
            bgcolor: '#ff7043', 
            color: 'white', 
            '&:hover': { bgcolor: '#f4511e' }
          }}
        >
          XUẤT BÁO CÁO
          <Typography variant="caption" sx={{ ml: 1 }}>
            PDF, EXCEL
          </Typography>
        </Button>
      </Box>
      </Paper>
    </Box>
  );
};

export default StatisticsReport;
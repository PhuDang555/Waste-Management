import { Box, Paper, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import RecyclingIcon from '@mui/icons-material/Recycling';
import VerifiedIcon from '@mui/icons-material/Verified';

const WorkflowStep = ({ title, icon, color, cornerColor }) => (
  <Paper
    elevation={0}
    sx={{
      position: 'relative',
      p: 3,
      borderRadius: 2,
      border: '2px solid',
      borderColor: color,
      minHeight: '150px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      overflow: 'visible',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: -2,
        right: -2,
        width: '40px',
        height: '40px',
        backgroundColor: cornerColor,
        borderRadius: '0 8px 0 40px'
      }
    }}
  >
    <Box
      sx={{
        bgcolor: color,
        borderRadius: '50%',
        width: 60,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
      }}
    >
      {icon}
    </Box>
    <Typography
      variant="h6"
      component="div"
      sx={{
        color: '#0088cc',
        fontSize: '1.1rem',
        fontWeight: 500,
        lineHeight: 1.2
      }}
    >
      {title}
    </Typography>
  </Paper>
);

const CapabilityPage = () => {
  return (
    <Box> 
      <Paper elevation={3} sx={{ p: 3, minHeight: "96vh"}}>
      <Box sx={{ flex: 1, zIndex: 1 }}>
        <WorkflowStep
          title="Hồ sơ năng lực"
          icon={<DescriptionIcon sx={{ color: 'white', fontSize: 30 }} />}
          color="#e91e63"
          cornerColor="#d81b60"
        />
      </Box>

      <Box sx={{ flex: 1, zIndex: 1 }}>
        <WorkflowStep
          title="Giấy phép"
          icon={<VerifiedIcon sx={{ color: 'white', fontSize: 30 }} />}
          color="#ff5722"
          cornerColor="#f4511e"
        />
      </Box>

      <Box sx={{ flex: 1, zIndex: 1 }}>
        <WorkflowStep
          title="Phương tiện thu gom"
          icon={<LocalShippingIcon sx={{ color: 'white', fontSize: 30 }} />}
          color="#4caf50"
          cornerColor="#43a047"
        />
      </Box>

      <Box sx={{ flex: 1, zIndex: 1 }}>
        <WorkflowStep
          title="Trạm trung chuyển"
          icon={<WarehouseIcon sx={{ color: 'white', fontSize: 30 }} />}
          color="#00bcd4"
          cornerColor="#00acc1"
        />
      </Box>

      <Box sx={{ flex: 1, zIndex: 1 }}>
        <WorkflowStep
          title="Đối tác tái chế"
          icon={<RecyclingIcon sx={{ color: 'white', fontSize: 30 }} />}
          color="#3f51b5"
          cornerColor="#3949ab"
        />
      </Box>
      </Paper>
    </Box>
  );
};

export default CapabilityPage;
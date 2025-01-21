import {
    Box,
    Typography,
    Paper,
    IconButton,
  } from '@mui/material';
  import { Edit, DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const CollectionItem  = ({ data }) => (
   
    <Paper 
      elevation={1} 
      sx={{ 
        p: 2, 
        border: '1px solid #c4e3ff',
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        height: '100%' // Ensure consistent height
      }}
    >
      {/* Creation Time Tag */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          bgcolor: '#ff7f50',
          color: 'white',
          px: 2,
          py: 1,
          borderBottomRightRadius: 8
        }}
      >
        <Typography variant="body2">
          {data.createdAt}
        </Typography>
      </Box>
  
      {/* Main Content */}
      <Box sx={{ mt: 5, pl: 1 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            • Thời gian thu gom: Ngày {data.collectionDate}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            • Loại rác thu gom: {data.wasteType}
          </Typography>
          <Typography variant="body1">
            • Khối lượng: {data.quantity}kg
          </Typography>
        </Box>
      </Box>
  
      {/* Actions */}
      <Box sx={{ 
        position: 'absolute', 
        top: 4, 
        right: 16,
        display: 'flex',
        gap: 1
      }}>
        <IconButton 
          size="small"
          sx={{ 
            color: '#666',
            '&:hover': { color: '#000' }
          }}
        >
          <Edit />
        </IconButton>
        <IconButton 
          size="small"
          sx={{ 
            color: '#666',
            '&:hover': { color: '#000' }
          }}
        >
          <DeleteOutline />
        </IconButton>
      </Box>
  
      <Box sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          color: '#00bcd4',
          textDecoration: 'none',
          '&:hover': {
          textDecoration: 'underline'}
      }}>
        <Link
          // component="button"
          to={`/dashboard/collect-manage/${data.id}`}
        >
          XEM CHI TIẾT
        </Link>
      </Box>
    </Paper>
  );

export default CollectionItem
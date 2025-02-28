import { useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
  IconButton,
} from '@mui/material';
import { Edit, DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { deleted } from '../../store/features/dataInputSlice';

const CollectionItem = ({ data }) => {
  const dispatch = useDispatch();

  // Xử lý xóa
  const handleDelete = async () => {
    try {
      await dispatch(deleted(data.id)).unwrap();
      toast.success('Xóa thành công!');
    } catch (error) {
      toast.error('Xóa thất bại: ' + (error.message || 'Lỗi không rõ'));
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        border: '1px solid #c4e3ff',
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        height: '100%', // Ensure consistent height
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
          borderBottomRightRadius: 8,
        }}
      >
        <Typography variant="body2">{data.created_at}</Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ mt: 4, pl: 1 }}>
        <Box sx={{ mb: 0 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            • Thời gian thu gom: Ngày {data.processing_time}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            • Loại rác thu gom: {data.waste_type_id}
          </Typography>
          <Typography variant="body1">
            • Khối lượng: {data.volume}kg
          </Typography>
        </Box>
      </Box>

      {/* Actions */}
      <Box
        sx={{
          position: 'absolute',
          top: 4,
          right: 16,
          display: 'flex',
          gap: 1,
        }}
      >
        <IconButton
          size="small"
          sx={{
            color: '#666',
            '&:hover': { color: '#000' },
          }}
        >
          <Link to={`/dashboard/collect-manage/${data.id}`}>
            <Edit />
          </Link>
        </IconButton>
        <IconButton
          size="small"
          sx={{
            color: '#666',
            '&:hover': { color: '#000' },
          }}
          onClick={handleDelete} // Gắn handler xóa
        >
          <DeleteOutline />
        </IconButton>
      </Box>

      {/* Xem chi tiết */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          color: '#00bcd4',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        }}
      >
        <Link to={`/dashboard/collect-manage/${data.id}`}>XEM CHI TIẾT</Link>
      </Box>
    </Paper>
  );
};

export default CollectionItem;
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Menu,
  MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { listUser } from '../store/features/createUserSlice';

const ListCustomerPage = () => {
  const dispatch = useDispatch();
  const paginationModel = { page: 0, pageSize: 5 };
  const [anchorEl, setAnchorEl] = useState(null);
  const { listUsers } = useSelector((state) => state.createUser);

  useEffect(()=>{
    if(!listUsers?.length || listUsers.length === 0) dispatch(listUser());

  },[dispatch, listUsers]);
  
 
  const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'full_name', headerName: 'TÊN TÀI KHOẢN', width: 300 },
    { field: 'username', headerName: 'MÃ TÀI KHOẢN', width: 300 },
    { field: 'address', headerName: 'ĐỊA CHỈ', width: 400 },
    { field: 'phone_number', headerName: 'SỐ ĐIỆN THOẠI',sortable: false, width: 200 },
    { field: 'permission_id', 
      headerName: 'NHÓM QUYỀN',
      sortable: false, 
      width: 200,
      renderCell: (params) => {
        return (
          <Typography 
            sx={{ 
              fontWeight: 'bold',
              color:'#1976d2',
              mt:2
            }}
          >
            {params.row.permission_id === 2 ? 'QUẢN LÝ' : 'VẬN HÀNH'}
          </Typography>
        );
      }
    },
  ];

  const vietnameseLocaleText = {
    toolbarDensity: 'Mật độ',
    toolbarDensityLabel: 'Mật độ',
    toolbarDensityCompact: 'Nhỏ',
    toolbarDensityStandard: 'Chuẩn',
    toolbarDensityComfortable: 'Rộng',
  
    footerRowSelected: (count) =>
      count !== 1 ? `${count} hàng được chọn` : `${count} hàng đã chọn`,
    footerTotalRows: 'Tổng số dòng:',
    footerTotalRowsShort: 'Tổng:',
  
    MuiTablePagination: {
      labelRowsPerPage: 'Số hàng trên mỗi trang:',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}–${to} / ${count !== -1 ? count : `nhiều hơn`}`,
    },
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    switch (action) {
      case 'edit':
        alert('Chọn chỉnh sửa tài khoản');
        // Thêm logic chỉnh sửa (ví dụ: mở form)
        break;
      case 'delete':
        if (window.confirm('Bạn có chắc muốn xóa tài khoản?')) {
          alert('Tài khoản đã được xóa');
          // Thêm logic xóa (gọi API)
        }
        break;
      case 'block':
        if (window.confirm('Bạn có chắc muốn block tài khoản?')) {
          alert('Tài khoản đã bị block');
          // Thêm logic block (gọi API)
        }
        break;
      default:
        break;
    }
    handleClose();
  };
  return (
    <Box sx={{ flex: 1, padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          DANH SÁCH TÀI KHOẢN
        </Typography>
        {/* <Button
          variant="contained"
          sx={{
            backgroundColor: '#ff9800',
            '&:hover': { backgroundColor: '#f57c00' },
            textTransform: 'uppercase',
          }}
        >
          Thao tác
        </Button> */}
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#ff9800',
              '&:hover': { backgroundColor: '#f57c00' },
              textTransform: 'uppercase',
              width:'200px'
            }}
            onClick={handleClick}
          >
            Thao tác
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => handleAction('edit')} sx={{width:'200px'}}>Chỉnh sửa</MenuItem>
            <MenuItem onClick={() => handleAction('delete')} sx={{width:'200px'}}>Xóa</MenuItem>
            <MenuItem onClick={() => handleAction('block')} sx={{width:'200px'}}>Khóa</MenuItem>
          </Menu>
        </Box>
      </Box>
      {/* Thanh tìm kiếm */}
      <Box sx={{ mb: 4, display:'flex', justifyContent: 'flex-end'}}>
        <TextField
          placeholder="Tìm kiếm..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'gray' }} />,
          }}
          sx={{ width: '300px', backgroundColor: 'white' }}
        />
      </Box>

      <Paper elevation={4} sx={{ height: '75vh', width: '100%' }}>
        <DataGrid
          rows={listUsers}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
          localeText={vietnameseLocaleText}
        />
      </Paper>
    </Box>
  );
};

export default ListCustomerPage;
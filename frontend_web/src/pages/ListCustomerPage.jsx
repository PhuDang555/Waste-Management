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
import { block, deleted, getUser, listUser } from '../store/features/createUserSlice';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ListCustomerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paginationModel = { page: 0, pageSize: 5 };
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { listUsers } = useSelector((state) => state.createUser);

  useEffect(()=>{
    if(!listUsers?.length || listUsers.length === 0) dispatch(listUser());

  },[dispatch, listUsers]);
  
 
  const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'full_name', headerName: 'TÊN TÀI KHOẢN', flex: 1 },
    { field: 'username', headerName: 'MÃ TÀI KHOẢN', flex: 1 },
    { field: 'phone_number', headerName: 'SỐ ĐIỆN THOẠI',sortable: false, flex: 1 },
    { field: 'permission_id', 
      headerName: 'NHÓM QUYỀN',
      sortable: false, 
      flex: 1,
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
    { field: 'is_blocked', 
      headerName: 'KHÓA', 
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography 
            sx={{ 
              fontWeight: 'bold',
              color:'#1976d2',
              mt:2
            }}
          >
            {params.row.is_blocked === 0 ? (
              <LockOpenIcon sx={{ mr: 1 }} /> 
            ) : (
              <BlockIcon sx={{ mr: 1 }} />
            )}
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

  const filteredUsers = listUsers.filter((user) =>
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = async (action) => {
    if (selectedIds.length === 0) {
      toast.warning('Vui lòng chọn ít nhất một tài khoản!');
      handleClose();
      return;
    }

    switch (action) {
      case 'edit':
        if (selectedIds.length > 1) {
          toast.warning('Vui lòng chỉ chọn một tài khoản để chỉnh sửa!');
          setSelectedIds([]);
          handleClose();
          return;
        }else{
          const selectedUser = await dispatch(getUser(selectedIds[0]));
          
          navigate('/admin/management/create-account', { state: { editData: selectedUser?.payload, isEdit: true } });
        }
        break;
      case 'delete':
        try {
          await dispatch(deleted(selectedIds));
          toast.success('Xóa tài khoản thành công.');
        } catch (error) {
          console.log(error);
          toast.error('Xóa tài khoản gặp lỗi.');
        }
        break;
      case 'block':
        try {
          await dispatch(block(selectedIds));
          toast.success('Khóa tài khoản thành công.');
        } catch (error) {
          console.log(error);
          toast.error('Khóa tài khoản gặp lỗi.');
        }
        break;
      default:
        break;
    }
    setSelectedIds([]);
    dispatch(listUser());
    handleClose();
  };
  return (
    <Box sx={{ flex: 1, padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          DANH SÁCH TÀI KHOẢN
        </Typography>
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
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'gray' }} />,
          }}
          sx={{ width: '300px', backgroundColor: 'white' }}
        />
      </Box>

      <Paper elevation={4} sx={{ height: '75vh', width: '100%' }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          rowSelectionModel={selectedIds}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => setSelectedIds(newSelection)}
          sx={{ border: 0 }}
          localeText={vietnameseLocaleText}
        />
      </Paper>
    </Box>
  );
};

export default ListCustomerPage;
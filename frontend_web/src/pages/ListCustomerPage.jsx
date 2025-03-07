import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const ListCustomerPage = () => {

  const rows = [
    { name: 'Siêu thị Mega Market', email: '0989000013', role: 'Vận hành' },
    { name: 'QL Mega Market', email: '0123456789', role: 'Quản lý' },
  ];

  return (
    <Box sx={{ flex: 1, padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          DANH SÁCH TÀI KHOẢN
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ff9800',
            '&:hover': { backgroundColor: '#f57c00' },
            textTransform: 'uppercase',
          }}
        >
          Thao tác
        </Button>
      </Box>
      {/* Thanh tìm kiếm */}
      <Box sx={{ mb: 2, display:'flex', justifyContent: 'flex-end'}}>
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

      {/* Bảng */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>TÊN TÀI KHOẢN</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>MAIL/SDT</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>NHÓM QUYỀN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListCustomerPage;
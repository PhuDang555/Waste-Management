import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  InputAdornment,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Badge
} from '@mui/material';
import { Search, Edit, Delete, CloudUpload, Camera } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Custom theme with Vietnamese-friendly colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#0288D1',
    },
    secondary: {
      main: '#FF9966',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const ProcessUnitAdminPage = () => {
  // State management
  const [collectionFacilities, setCollectionFacilities] = useState([
    { id: 1, name: 'HTX MÔI TRƯỜNG GÒ VẤP', contact: '0989090013', address: 'Gò Vấp, TP.HCM', taxCode: '03456987' },
    { id: 2, name: 'GRAC', contact: '0123456789', address: '', taxCode: '' },
    { id: 3, name: '', contact: '', address: '', taxCode: '' },
  ]);
  
  const [facilityName, setFacilityName] = useState('HTX MÔI TRƯỜNG GÒ VẤP');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [taxCode, setTaxCode] = useState('03456987');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [contact, setContact] = useState('0989090013');
  const [searchTerm, setSearchTerm] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  // Handle form submission
  const handleSubmit = () => {
    // Add new facility or update existing one
    const newFacility = {
      id: collectionFacilities.length + 1,
      name: facilityName,
      contact: contact,
      address: address,
      taxCode: taxCode
    };
    
    setCollectionFacilities([...collectionFacilities, newFacility]);
    // Reset form or show success message
  };

  // Handle delete facility
  const handleDelete = (id) => {
    setCollectionFacilities(collectionFacilities.filter(facility => facility.id !== id));
  };

  // Handle edit facility
  const handleEdit = (facility) => {
    setFacilityName(facility.name);
    setContact(facility.contact);
    setTaxCode(facility.taxCode);
    // Set other fields as needed
  };

  // Handle profile image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Filter facilities based on search term
  const filteredFacilities = collectionFacilities.filter(facility => 
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.contact.includes(searchTerm)
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: 1400, mx: 'auto', p: 3 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 3 }}>
                THÊM ĐƠN VỊ THU GOM
              </Typography>
              <Badge
                sx={{ bgcolor: '#FFEB3B', color: '#000', p: 1, borderRadius: 1, mb: 2, display: 'inline-block' }}
              >
                Hiển thị lúc nhập liệu
              </Badge>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{ bgcolor: 'rgba(255, 255, 255, 0.7)', width: 36, height: 36 }}
                  >
                    <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
                    <Camera />
                  </IconButton>
                }
              >
                <Avatar 
                  src={profileImage}
                  sx={{ width: 120, height: 120, bgcolor: '#ccc' }}
                >
                  {!profileImage && <Typography variant="h2" color="white">?</Typography>}
                </Avatar>
              </Badge>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Tên hiển thị"
                variant="outlined"
                value={facilityName}
                onChange={(e) => setFacilityName(e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Địa chỉ:</Typography>
              <TextField
                fullWidth
                placeholder="Số nhà"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Tỉnh/TP</InputLabel>
                    <Select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      input={<OutlinedInput label="Tỉnh/TP" />}
                    >
                      <MenuItem value="HCM">TP.HCM</MenuItem>
                      <MenuItem value="HN">Hà Nội</MenuItem>
                      <MenuItem value="DN">Đà Nẵng</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Quận/Huyện</InputLabel>
                    <Select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      input={<OutlinedInput label="Quận/Huyện" />}
                    >
                      <MenuItem value="1">Quận 1</MenuItem>
                      <MenuItem value="GV">Gò Vấp</MenuItem>
                      <MenuItem value="TD">Thủ Đức</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Phường/Xã</InputLabel>
                    <Select
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      input={<OutlinedInput label="Phường/Xã" />}
                    >
                      <MenuItem value="1">Phường 1</MenuItem>
                      <MenuItem value="2">Phường 2</MenuItem>
                      <MenuItem value="3">Phường 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="MST"
                    variant="outlined"
                    value={taxCode}
                    onChange={(e) => setTaxCode(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Phương tiện"
                    variant="outlined"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </Grid>
              </Grid>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Liên hệ"
                    variant="outlined"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1" sx={{ mr: 2 }}>Tải giấy phép:</Typography>
                  <IconButton 
                    component="label" 
                    sx={{ border: '1px solid #ccc', p: 1 }}
                  >
                    <input hidden accept="application/pdf" type="file" />
                    <CloudUpload />
                  </IconButton>
                </Grid>
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={handleSubmit}
                  sx={{ 
                    px: 4, 
                    py: 1.5, 
                    borderRadius: 6,
                    fontSize: '1rem',
                    textTransform: 'uppercase'
                  }}
                >
                  Lưu lại
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
            DANH SÁCH ĐƠN VỊ THU GOM
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <TextField
              placeholder="Tìm kiếm..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 300 }}
            />
          </Box>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: '#0288D1' }}>STT</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: '#0288D1' }}>TÊN ĐƠN VỊ</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: '#0288D1' }}>MAIL/SĐT</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: '#0288D1' }}>THAO TÁC</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFacilities.map((facility, index) => (
                  <TableRow 
                    key={facility.id} 
                    sx={{ '&:nth-of-type(odd)': { backgroundColor: '#FFF8E1' } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{facility.name}</TableCell>
                    <TableCell align="center">{facility.contact}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => handleEdit(facility)}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(facility.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProcessUnitAdminPage;
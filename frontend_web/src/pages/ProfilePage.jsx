import React from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Paper,
} from '@mui/material';
import { PhotoCamera, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = React.useState({
    displayName: 'SIÊU THỊ MEGA MARKET',
    address: '',
    province: '',
    district: '',
    ward: '',
    userGroup: '',
    managementUnit: '',
    phone: '0989090013',
    hasExpiration: true,
    expirationDate: '',
  });

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, position: 'relative', mt: 4 }}>
        {/* Close button */}
        <IconButton 
          sx={{ position: 'absolute', right: 8, top: 8 }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>

        <Grid container spacing={3}>
          {/* Left side - Form */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Profile Information
            </Typography>
            
            <Box component="form" noValidate sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tên hiển thị"
                    value={formData.displayName}
                    onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Số nhà"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Select
                      value={formData.province}
                      onChange={(e) => setFormData({...formData, province: e.target.value})}
                      displayEmpty
                    >
                      <MenuItem value="">Tỉnh/TP</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Select
                      value={formData.district}
                      onChange={(e) => setFormData({...formData, district: e.target.value})}
                      displayEmpty
                    >
                      <MenuItem value="">Quận/Huyện</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Select
                      value={formData.ward}
                      onChange={(e) => setFormData({...formData, ward: e.target.value})}
                      displayEmpty
                    >
                      <MenuItem value="">Phường/Xã</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <Select
                      value={formData.userGroup}
                      onChange={(e) => setFormData({...formData, userGroup: e.target.value})}
                      displayEmpty
                    >
                      <MenuItem value="">Nhóm quyền</MenuItem>
                      <MenuItem value="admin">Quản lý</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <Select
                      value={formData.managementUnit}
                      onChange={(e) => setFormData({...formData, managementUnit: e.target.value})}
                      displayEmpty
                    >
                      <MenuItem value="">Đơn vị quản lý</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* CTR Fields */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Tổng CTR sinh hoạt
                  </Typography>
                  {/* Add CTR input fields here */}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Liên hệ"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </Grid>
              </Grid>

              {/* Login Account Section */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Tài khoản đăng nhập
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Số điện thoại/Email"
                      value={formData.phone}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Mật khẩu"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Xác nhận mật khẩu"
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button variant="contained" color="success">
                  Lưu thông tin
                </Button>
                <Button variant="contained" color="warning">
                  Trở về
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right side - Avatar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                sx={{ width: 150, height: 150, mb: 2 }}
              />
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
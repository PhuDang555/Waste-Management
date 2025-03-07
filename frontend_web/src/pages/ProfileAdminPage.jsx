import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { PhotoCamera, CalendarToday } from '@mui/icons-material';

const ProfileAdminPage = () => {
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

  const handleExpirationChange = (event) => {
    setFormData({
      ...formData,
      isUnlimited: event.target.checked,
      expirationDate: event.target.checked ? '' : formData.expirationDate
    });
  };

  return (
    <Box sx={{ flex: 1, padding: 3 }}>
        <Grid container spacing={3}>
          {/* Left side - Form */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              THÔNG TIN KHÁCH HÀNG
            </Typography>
            
            <Box component="form" noValidate sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tên hiển thị"
                    value={formData.displayName}
                    onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Số nhà"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    size="small"
                  />
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Select
                      value={formData.province}
                      onChange={(e) => setFormData({...formData, province: e.target.value})}
                      displayEmpty
                      size="small"
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
                      size="small"
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
                      size="small"
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
                      size="small"
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
                      size="small"
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
                    value={formData.displayName}
                    onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Liên hệ"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    size="small"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                    Thời hạn dùng phần mềm
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="date"
                        label="Có thời hạn"
                        InputLabelProps={{ shrink: true }}
                        value={formData.expirationDate}
                        onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
                        disabled={formData.isUnlimited}
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <CalendarToday color="action" sx={{ ml: 1 }} />
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.isUnlimited}
                            onChange={handleExpirationChange}
                          />
                        }
                        label="Vô thời hạn"
                      />
                    </Grid>
                  </Grid>
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
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Mật khẩu"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Xác nhận mật khẩu"
                      size="small"
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
      </Box>
  );
};

export default ProfileAdminPage;
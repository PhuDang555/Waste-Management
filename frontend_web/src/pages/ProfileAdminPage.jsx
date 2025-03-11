import React, { useEffect, useRef, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { create, edit, listDistrict, listManageUnit, listProvince, listWard } from '../store/features/createUserSlice';
import { toast } from 'react-toastify';

const ProfileAdminPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { listManageUnits, listProvinces, listDistricts, listWards } = useSelector((state) => state.createUser);
  const { user, token } = useSelector((state) => state.auth);
  
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [selectedWardId, setSelectedWardId] = useState("");

  const imageInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(''); // URL ảnh cũ
  
  const { editData, isEdit } = location.state || {};

  const [formData, setFormData] = React.useState({
    displayName: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    userGroup: '',
    managementUnit: '',
    phone: '',
    expirationDate: '',
    'username': '',
    'password': '',
    'confirmPassword':'',
    'image': ''
  });

  const [errors, setErrors] = React.useState({
    displayName: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    userGroup: '',
    managementUnit: '',
    phone: '',
    expirationDate: '',
    'username': '',
    'password': '',
    'confirmPassword':'',
  });

  // Fetch data on mount
  useEffect(() => {
    if (!listManageUnits?.length) dispatch(listManageUnit());
    if (!listProvinces?.length) dispatch(listProvince());
  }, [dispatch, listManageUnits?.length, listProvinces?.length]);

  useEffect(() => {
  if (selectedDistrictId) {
    dispatch(listWard(selectedDistrictId));
  }
  }, [dispatch, selectedDistrictId]);

  useEffect(() =>{
    if(selectedProvinceId){
      dispatch(listDistrict(selectedProvinceId));
      // setSelectedDistrictId(null);
    }
  },[dispatch, selectedProvinceId]);

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value; 
    setSelectedProvinceId(provinceId);
    setSelectedDistrictId("");
    setSelectedWardId("");
    
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrictId(districtId);
    setSelectedWardId("");
  };

  const handleExpirationChange = (event) => {
    setFormData({
      ...formData,
      isUnlimited: event.target.checked,
      expirationDate: event.target.checked ? '' : formData.expirationDate
    });
  };

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    if (file) setter(file);
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = {
      displayName: 'Vui lòng điền tên hiển thị ',
      address: 'Vui lòng điền tên địa chỉ',
      province: 'Vui lòng chọn Tỉnh/TP',
      district: 'Vui lòng chọn Quận/Huyện',
      ward: 'Vui lòng chọn Phường/Xã',
      userGroup: 'Vui lòng chọn nhóm quyền',
      managementUnit: 'Vui lòng chọn đơn vị quản lý',
      phone: 'Vui lòng điền số điện thoại',
      expirationDate: 'Vui lòng điền thời hạn dùng phần mềm',
      username: 'Vui lòng điền tên đăng nhập',
      password: 'Vui lòng điền password',
      confirmPassword: 'Vui lòng điền xác nhận password',
    };
    
    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field]) newErrors[field] = message;
    });

    return newErrors;
  };

  const resetForm = () => {
    setFormData({
      displayName: '',
      address: '',
      province: '',
      district: '',
      ward: '',
      userGroup: '',
      managementUnit: '',
      phone: '',
      expirationDate: '',
      'username': '',
      'password': '',
      'confirmPassword':'',
    });
    setImageFile('');
    setExistingImageUrl('');
    setErrors({});
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('user_id', user?.id);
    formDataToSend.append('waste_collection_unit_id', formData.collectionUnit);
    formDataToSend.append('waste_type_id', formData.wasteType);
    formDataToSend.append('volume', formData.quantity);
    formDataToSend.append('note', formData.notes);
    formDataToSend.append(
      'processing_time',
      new Date(formData.collectionDate).toLocaleDateString('fr-CA')
    );
    
    if (imageFile) formDataToSend.append('image', imageFile);

    try {
      if (isEdit && editData?.id) {
        await dispatch(edit({ id: editData.id, data: formDataToSend })).unwrap();
        toast.success('Cập nhật thành công!');
      } else {
        await dispatch(create(formDataToSend)).unwrap();
        toast.success('Nhập liệu gửi thành công!');
      }
      resetForm();
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(isEdit ? 'Cập nhật thất bại!' : 'Nhập dữ liệu thất bại, thử lại nhé!');
    }
  };

  return (
    <Box sx={{ flex: 1, padding: 3 }}>
        <Grid container spacing={3}>
          {/* Left side - Form */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" sx={{ mb: 3, color: '#0288D1', fontWeight: 'bold' }}>
              THÊM TÀI KHOẢN
            </Typography>
            
            <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tên hiển thị"
                    value={formData.displayName}
                    onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                    size="small"
                  />
                  {errors.displayName && (
                    <Typography variant="caption" color="error">
                      {errors.displayName}
                    </Typography>
                  )}
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
                      value={selectedProvinceId ?? ''}
                      onChange={handleProvinceChange}
                      displayEmpty
                      size="small"
                    >
                      <MenuItem value="">Tỉnh/TP</MenuItem>
                      {listProvinces.map((unit) => (
                        <MenuItem key={unit.id} value={unit.id}>
                          {unit.full_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Select
                      onChange={handleDistrictChange} 
                      value={selectedDistrictId ?? ''} 
                      disabled={!selectedProvinceId}
                      displayEmpty
                      size="small"
                    >
                      <MenuItem value="">Quận/Huyện</MenuItem>
                      {listDistricts.map((unit) => (
                        <MenuItem key={unit.id} value={unit.id}>
                          {unit.full_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Select
                      value={selectedWardId ?? ''} 
                      disabled={!selectedDistrictId}
                      displayEmpty
                      size="small"
                    >
                      <MenuItem value="">Phường/Xã</MenuItem>
                      {listWards.map((unit) => (
                        <MenuItem key={unit.id} value={unit.id}>
                          {unit.full_name}
                        </MenuItem>
                      ))}
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
                      <MenuItem value="1">ADMIN</MenuItem>
                      <MenuItem value="2">QUẢN LÝ</MenuItem>
                      <MenuItem value="3">VẬN HÀNH</MenuItem>
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
                      disabled={formData.userGroup !== "3"}
                    >
                      <MenuItem value="">Đơn vị quản lý</MenuItem>
                      {listManageUnits.map((unit) => (
                        <MenuItem key={unit.id} value={unit.id}>
                          {unit.full_name}
                        </MenuItem>
                      ))}
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
                      // disabled
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
                {/* <Button variant="contained" color="warning">
                  Trở về
                </Button> */}
              </Box>
            </Box>
          </Grid>

          {/* Right side - Avatar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                sx={{ width: 150, height: 150, mb: 2 }}
              />
              <IconButton color="primary" aria-label="upload picture" component="label" >
                <input 
                    hidden 
                    accept="image/*" 
                    type="file"
                    ref={imageInputRef}
                    onChange={handleFileChange(setImageFile)}
                />
                <PhotoCamera />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default ProfileAdminPage;
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
import { fetchUser } from '../store/features/authSlice';

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
    isUnlimited: false,
    username: '',
    password: '',
    confirmPassword:'',
    image: ''
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
    username: '',
    password: '',
    confirmPassword:'',
  });

  // Fetch data on mount
  useEffect(() => {
    if (!listManageUnits?.length) dispatch(listManageUnit());
    if (!listProvinces?.length) dispatch(listProvince());
  }, [dispatch, listManageUnits?.length, listProvinces?.length]);

  useEffect(() => {
    if (token) dispatch(fetchUser());
  }, [token, dispatch]);

  useEffect(() => {
  if (selectedDistrictId) {
    dispatch(listWard(selectedDistrictId));
  }
  }, [dispatch, selectedDistrictId]);

  useEffect(() =>{
    if(selectedProvinceId){
      dispatch(listDistrict(selectedProvinceId));
    }
  },[dispatch, selectedProvinceId]);

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setFormData({...formData, province: provinceId}) 
    setSelectedProvinceId(provinceId);
    setSelectedDistrictId("");
    setSelectedWardId("");
    
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setFormData({...formData, district: districtId}) 
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
      address: 'Vui lòng điền địa chỉ',
      province: 'Vui lòng chọn Tỉnh/TP',
      district: 'Vui lòng chọn Quận/Huyện',
      ward: 'Vui lòng chọn Phường/Xã',
      userGroup: 'Vui lòng chọn nhóm quyền',
      managementUnit: 'Vui lòng chọn đơn vị quản lý',
      phone: 'Vui lòng điền số điện thoại',
      expirationDate: 'Vui lòng điền thời hạn dùng phần mềm',
      username: 'Vui lòng điền tên đăng nhập',
      password: 'Vui lòng điền mật khẩu',
      confirmPassword: 'Vui lòng điền xác nhận mật khẩu',
    };
    
    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field]){
        if (field === "managementUnit" && (formData.userGroup == 1 || formData.userGroup == 2)) {
          return;
        }
        newErrors[field] = message;
      }
    });

    // Kiểm tra số điện thoại (phải có 10 hoặc 11 số)
    const phoneRegex = /^(0\d{9,10})$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải có 10 hoặc 11 số và bắt đầu bằng số 0.";
    }

    // Kiểm tra độ mạnh của mật khẩu
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
    }

    // Kiểm tra mật khẩu xác nhận
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không trùng khớp.";
    } 

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
      username: '',
      password: '',
      confirmPassword:'',
    });
    setImageFile('');
    setExistingImageUrl('');
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    
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
          
          <Box component="form"  sx={{ mt: 2 }} onSubmit={handleSubmit}>
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
                {errors.address && (
                  <Typography variant="caption" color="error">
                    {errors.address}
                  </Typography>
                )}
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
                  {errors.province && (
                  <Typography variant="caption" color="error">
                    {errors.province}
                  </Typography>
                )}
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
                  {errors.district && (
                  <Typography variant="caption" color="error">
                    {errors.district}
                  </Typography>
                )}
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  <Select
                    value={selectedWardId ?? ''} 
                    disabled={!selectedDistrictId}
                    onChange={(e) => {
                      setFormData({...formData, ward: e.target.value})
                      setSelectedWardId(e.target.value);
                    }}
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
                  {errors.ward && (
                  <Typography variant="caption" color="error">
                    {errors.ward}
                  </Typography>
                )}
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
                  {errors.userGroup && (
                  <Typography variant="caption" color="error">
                    {errors.userGroup}
                  </Typography>
                )}
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
                  {errors.managementUnit && (
                  <Typography variant="caption" color="error">
                    {errors.managementUnit}
                  </Typography>
                )}
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
                {errors.phone && (
                  <Typography variant="caption" color="error">
                    {errors.phone}
                  </Typography>
                )}
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
                    {errors.expirationDate && (
                      <Typography variant="caption" color="error">
                        {errors.expirationDate}
                      </Typography>
                    )}
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
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    // disabled
                    size="small"
                  />
                  {errors.username && (
                    <Typography variant="caption" color="error">
                      {errors.username}
                    </Typography>
                  )}  
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Mật khẩu"
                    size="small"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  {errors.password && (
                    <Typography variant="caption" color="error">
                      {errors.password}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Xác nhận mật khẩu"
                    size="small"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                  {errors.confirmPassword && (
                    <Typography variant="caption" color="error">
                      {errors.confirmPassword}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button variant="contained" color="success" type="submit">
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
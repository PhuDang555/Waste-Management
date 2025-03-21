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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputAdornment,
} from '@mui/material';
import { PhotoCamera, CloudUpload, Edit, Delete, Search, Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { create, edit, listDistrict, listManageUnit, listProvince, listUser, listWard } from '../store/features/createUserSlice';
import { toast } from 'react-toastify';

const ProcessUnitAdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { listManageUnits, listProvinces, listDistricts, listWards } = useSelector((state) => state.createUser);
  
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [selectedWardId, setSelectedWardId] = useState("");
  const [searchTerm, setSearchTerm] = useState('');

  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [licensesFile, setLicensesFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const { editData, isEdit } = location.state || {};

  const [collectionFacilities, setCollectionFacilities] = useState([
    { id: 1, name: 'HTX MÔI TRƯỜNG GÒ VẤPdfdfdf', contact: '0989090013', address: 'Gò Vấp, TP.HCM', taxCode: '03456987' },
    { id: 2, name: 'GRACfdfsfsdf', contact: '0123456789', address: '', taxCode: '' },
    { id: 3, name: '', contactsfdfsdfsf: '', address: '', taxCode: '' },
  ]);

  const filteredFacilities = collectionFacilities.filter(facility => 
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.contact.includes(searchTerm)
  );

  const [formData, setFormData] = React.useState({
    displayName: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    taxcode: '',
    vehicle: '',
    phone: '',
  });

  const [errors, setErrors] = React.useState({
    displayName: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    taxcode: '',
    vehicle: '',
    phone: '',
  });

  useEffect(() => {
    if (isEdit && editData) {
      setFormData({
        displayName: editData.full_name || '',
        address: editData.address || '',
        province: editData.province_id || '',
        district: editData.district_id || '',
        ward: editData.ward_id || '',
        userGroup: editData.permission_id || '',
        managementUnit: editData.management_unit_id || '',
        phone: editData.phone_number || '',
        email: editData.email || '',
        username: editData.username || '',
        expirationDate: editData.license_expiration || '',
        isUnlimited: !editData.license_expiration ,
        
      });

      setSelectedProvinceId(editData.province_id || '');
      setSelectedDistrictId(editData.district_id || '');
      setSelectedWardId(editData.ward_id || '');

      if (editData.avatar) {
        const fullImageUrl = `http://127.0.0.1:8000/storage/${editData.avatar}`;
        
        setImagePreview(fullImageUrl);
      } else {
        setImagePreview(null);
      }
    }
  }, [editData, isEdit]);

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

  const validateForm = () => {
    const newErrors = {};
    
    const requiredFields = {
      displayName: 'Vui lòng điền tên hiển thị ',
      address: 'Vui lòng điền địa chỉ',
      province: 'Vui lòng chọn Tỉnh/TP',
      district: 'Vui lòng chọn Quận/Huyện',
      ward: 'Vui lòng chọn Phường/Xã',
      taxcode: 'Vui lòng nhập mã số thuế',
      vehicle: 'Vui lòng nhập phương tiện',
      phone: 'Vui lòng điền số điện thoại',
    };
    
    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field]) newErrors[field] = message;
    });

    // Kiểm tra số điện thoại (phải có 10 hoặc 11 số)
    const phoneRegex = /^(0\d{9,10})$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải có 10 hoặc 11 số và bắt đầu bằng số 0.";
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
      taxcode: '',
      vehicle: '',
      phone: '',
    });
    setImageFile('');
    setSelectedProvinceId('');
    setSelectedDistrictId('');
    setSelectedWardId('');
    setImagePreview(null);
    setErrors({});
  };

  const handleImageChange = (setImageFile) => (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (setLicensesFile) => (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || 
                 file.type === 'application/msword' || 
                 file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setLicensesFile(file);
      setFileName(file.name); 
    } else {
      setFileName('');
    }
  };
  
  // Hàm xóa ảnh
  const handleRemoveImage = (setImageFile, setImagePreview, imageInputRef) => () => {
    setImageFile(null);
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = '';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('full_name', formData.displayName);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('province_id', formData.province);
    formDataToSend.append('district_id', formData.district);
    formDataToSend.append('ward_id', formData.ward);
    formDataToSend.append('ward_name', formData.vehicle);
    formDataToSend.append('tax_code', formData.taxcode);
    formDataToSend.append('phone_number', formData.phone);
   
    if (imageFile) formDataToSend.append('avatar', imageFile);
    if (licensesFile) formDataToSend.append('license', licensesFile);
    if(isEdit) formDataToSend.append('id',editData.id);

    console.log(formData);
    try {
      if (isEdit && editData?.id) {
        await dispatch(edit(formDataToSend)).unwrap();
        toast.success('Cập nhật thành công!');
      } else {
        await dispatch(create(formDataToSend)).unwrap();
        toast.success('Nhập liệu gửi thành công!');
      }
      dispatch(listUser())
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
            THÊM ĐƠN VỊ THI GOM
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
                <TextField
                  fullWidth
                  label="Mã số thuế"
                  value={formData.taxcode}
                  onChange={(e) => setFormData({...formData, taxcode: e.target.value})}
                  size="small"
                />
                {errors.taxcode && (
                  <Typography variant="caption" color="error">
                    {errors.taxcode}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phương tiện"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                  size="small"
                />
                {errors.vehicle && (
                  <Typography variant="caption" color="error">
                    {errors.vehicle}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
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
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ mr: 2 }}>Tải giấy phép:</Typography>
                <IconButton 
                  component="label" 
                  sx={{ border: '1px solid #ccc', p: 1 }}
                >
                  <input 
                    hidden 
                    accept=".pdf,.doc,.docx"
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange(setLicensesFile)}
                  />
                  <CloudUpload />
                </IconButton>
                {fileName && (
                  <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2">{fileName}</Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => {
                        setFileName('');
                        setLicensesFile(null);
                        fileInputRef.current.value = '';
                      }}
                      sx={{ ml: 1 }}
                    >
                      <Close />
                    </IconButton>
                  </Box>
                )}
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', justifyContent:'center', gap: 2 }}>
              <Button variant="contained" color="success" type="submit">
                {isEdit ? 'Cập nhật thông tin' : 'Lưu thông tin' }
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', 'mt':6 }}>
            <Avatar
              src={imagePreview || '/path/to/default-avatar.jpg'}
              sx={{ width: 150, height: 150, mb: 2 }}
            />
            <Box>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  ref={imageInputRef}
                  // onChange={handleFileChange(setImageFile)}
                  onChange={handleImageChange(setImageFile, setImagePreview)}
                />
                <PhotoCamera />
              </IconButton>
              {imagePreview && (
                <IconButton
                  color="secondary"
                  aria-label="remove picture"
                  // onClick={handleRemoveImage}
                  onClick={handleRemoveImage(setImageFile, setImagePreview, imageInputRef)}
                  sx={{ ml: 1 }}
                >
                  ✕
                </IconButton>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mb: 3, mt:6}}>
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
        
        <TableContainer>
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
  );
};

export default ProcessUnitAdminPage;
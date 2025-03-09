import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import { KeyboardArrowDown, ImageOutlined, UploadFile, Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { create, edit, listCollectingUnit, listProcessingUnit, listWasteOwner, listWasteType } from '../store/features/dataInputSlice';
import { fetchUser } from '../store/features/authSlice';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';

const DataInputAdminPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { collectingUnits, wasteTypes, proccessingUnits, wasteOwners, loading } = useSelector((state) => state.dataInput);
  const { user, token } = useSelector((state) => state.auth);
  
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [docFile, setDocFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(''); // URL ảnh cũ
  const [existingDocUrl, setExistingDocUrl] = useState(''); // URL biên bản cũ

  // Kiểm tra nếu có dữ liệu chỉnh sửa từ state
  const { editData, isEdit } = location.state || {};
  
  const [formData, setFormData] = useState({
    collectionUnit: '',
    processUnit: '',
    wasteOwner: '',
    wasteType: '',
    quantity: '',
    collectionDate: '',
    collectionTime: '',
    notes: '',
    license_plate: '',
    image:'',
  });

  const [errors, setErrors] = useState({
    collectionUnit: '',
    processUnit: '',
    wasteOwner: '',
    wasteType: '',
    quantity: '',
    collectionDate: '',
    collectionTime: '',
  });

  // Điền dữ liệu từ editData khi vào chế độ chỉnh sửa
  useEffect(() => {
    if (isEdit && editData) {
      setFormData({
        collectionUnit: editData.waste_collection_unit_id || '',
        processUnit: editData.waste_processing_unit_id || '',
        wasteOwner: editData.waste_owner_id || '',
        wasteType: editData.waste_type_id || '',
        quantity: editData.volume || '',
        collectionDate: editData.processing_time.slice(0, 10) || '',
        collectionTime: editData.processing_time.slice(11, 19).split(":").map(part => part.padStart(2, "0")).join(":") || '',
        notes: editData.note || '',
      });
      
      setExistingImageUrl(editData.license_plate || '');
      setExistingDocUrl(editData.image || '');
    }
  }, [editData, isEdit]);

  // Fetch data on mount
  useEffect(() => {
    if (!loading) {
      if (!collectingUnits?.length) dispatch(listCollectingUnit());
      if (!wasteTypes?.length) dispatch(listWasteType());
      if (!proccessingUnits?.length) dispatch(listProcessingUnit());
      if (!wasteOwners?.length) dispatch(listWasteOwner());
    }
  }, [dispatch, loading, collectingUnits?.length, wasteTypes?.length, proccessingUnits?.length, wasteOwners?.length]);

  useEffect(() => {
    if (token) dispatch(fetchUser());
  }, [token, dispatch]);

  // Handlers
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (value) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && !isNaN(value))) {
      setFormData((prev) => ({ ...prev, quantity: value }));
      if (value) setErrors((prev) => ({ ...prev, quantity: '' }));
    }
  };

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    if (file) setter(file);
  };

  const shortenFileName = (name) => (name.length > 20 ? `${name.slice(0, 17)}...` : name);

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = {
      collectionUnit: 'Vui lòng chọn đơn vị thu gom',
      processUnit: 'Vui lòng chọn đơn vị xử lý',
      wasteOwner: 'Vui lòng chọn chủ nguồn thải',
      wasteType: 'Vui lòng chọn loại rác',
      quantity: 'Vui lòng nhập khối lượng',
      collectionDate: 'Vui lòng chọn ngày thu gom',
      collectionTime: 'Vui lòng chọn giờ thu gom',
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field]) newErrors[field] = message;
    });

    return newErrors;
  };

  const resetForm = () => {
    setFormData({
      collectionUnit: '',
      processUnit: '',
      wasteOwner: '',
      wasteType: '',
      quantity: '',
      collectionDate: '',
      collectionTime: '',
      notes: '',
    });
    setImageFile(null);
    setDocFile(null);
    setExistingDocUrl('');
    setExistingImageUrl('');
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const processingTime = `${formData.collectionDate} ${formData.collectionTime}:00`;
    
    const formDataToSend = new FormData();
    formDataToSend.append('user_id', user?.id);
    formDataToSend.append('waste_collection_unit_id', formData.collectionUnit);
    formDataToSend.append('waste_processing_unit_id', formData.processUnit);
    formDataToSend.append('waste_owner_id', formData.wasteOwner);
    formDataToSend.append('waste_type_id', formData.wasteType);
    formDataToSend.append('volume', formData.quantity);
    formDataToSend.append('note', formData.notes);
    formDataToSend.append('processing_time',processingTime);
    
    if (imageFile) formDataToSend.append('image', imageFile);
    if (docFile) formDataToSend.append('license_plate', docFile);

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

  // Common styles
  const inputStyles = {
    bgcolor: 'white',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#0088cc' },
  };

  const uploadButtonStyles = {
    bgcolor: '#40bfff',
    color: 'white',
    '&:hover': { bgcolor: '#0088cc' },
    width: 80,
    height: 80,
    mb: 1,
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, minHeight: '96vh' }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb:3,
            }}
          >
            <Typography variant="h6" color="primary" gutterBottom sx={{ mb: 4 }}>
              NHẬP LIỆU KHỐI LƯỢNG TÁI CHẾ
            </Typography>
            <Button
                variant='contained'
                size='large'
                sx={{ bgcolor: '#ff7f50', '&:hover': { bgcolor: '#ff6347' }, px: 4, py: 1, borderRadius: 2 }}
                type='submit'
            >
                <Link to="/admin/collect-manage">Quản lý đơn tái chế</Link>
            </Button>
          </Box>
          <Grid container spacing={4}>
            {/* ĐƠN VỊ THU GOM */}
            <Grid item xs={12} md={6} >
              <Typography variant="subtitle2" gutterBottom sx={{ color: '#0088cc' }}>
                ĐƠN VỊ THU GOM
              </Typography>
              <FormControl fullWidth error={!!errors.collectionUnit}>
                <Select
                  value={formData.collectionUnit || ''}
                  onChange={handleChange('collectionUnit')}
                  displayEmpty
                  IconComponent={KeyboardArrowDown}
                  sx={inputStyles}
                >
                  <MenuItem value="">Chọn đơn vị thu gom</MenuItem>
                  {collectingUnits.map((unit) => (
                    <MenuItem key={unit.id} value={unit.id}>
                      {unit.display_name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.collectionUnit && (
                  <Typography variant="caption" color="error">
                    {errors.collectionUnit}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            {/* CHỦ NGUỒN THẢI */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: '#0088cc' }}>
                CHỦ NGUỒN THẢI
              </Typography>
              <FormControl fullWidth error={!!errors.wasteOwner}>
                <Select
                  value={formData.wasteOwner || ''}
                  onChange={handleChange('wasteOwner')}
                  displayEmpty
                  IconComponent={KeyboardArrowDown}
                  sx={inputStyles}
                >
                  <MenuItem value="">Chọn chủ nguồn thải</MenuItem>
                  {wasteOwners.map((unit) => (
                    <MenuItem key={unit.id} value={unit.id}>
                      {unit.username}
                    </MenuItem>
                  ))}
                </Select>
                {errors.collectionUnit && (
                  <Typography variant="caption" color="error">
                    {errors.collectionUnit}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            {/* KHỐI LƯỢNG THU GOM */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: '#0088cc' }}>
                KHỐI LƯỢNG THU GOM
              </Typography>
              <TextField
                fullWidth
                type="number"
                value={formData.quantity}
                onChange={handleQuantityChange}
                error={!!errors.quantity}
                helperText={errors.quantity}
                InputProps={{
                  endAdornment: <InputAdornment position="end">KG</InputAdornment>,
                  inputProps: { min: 0, step: '0.01' },
                }}
                sx={inputStyles}
              />
            </Grid>
            {/* LOẠI RÁC */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: '#0088cc' }}>
                LOẠI RÁC
              </Typography>
              <FormControl fullWidth error={!!errors.wasteType}>
                <Select
                  value={formData.wasteType || ''}
                  onChange={handleChange('wasteType')}
                  displayEmpty
                  IconComponent={KeyboardArrowDown}
                  sx={inputStyles}
                >
                  <MenuItem value="">Chọn loại rác thải</MenuItem>
                  {wasteTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.waste_type_name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.wasteType && (
                  <Typography variant="caption" color="error">
                    {errors.wasteType}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            {/* THỜI GIAN THU GOM */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: '#0088cc' }}>
                THỜI GIAN VẬN CHUYỂN
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
              <TextField
                fullWidth
                type="date"
                value={formData.collectionDate}
                onChange={handleChange('collectionDate')}
                error={!!errors.collectionDate}
                helperText={errors.collectionDate}
                sx={inputStyles}
              />
              <TextField
                fullWidth
                type="time"
                value={formData.collectionTime}
                onChange={handleChange('collectionTime')}
                error={!!errors.collectionTime}
                helperText={errors.collectionTime}
                sx={inputStyles}
              />
              </Box>
            </Grid>
            
            {/* ĐƠN VỊ TÁI CHÊ */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: '#0088cc' }}>
                ĐƠN VỊ TÁI CHẾ
              </Typography>
              <FormControl fullWidth error={!!errors.processUnit}>
                <Select
                  value={formData.processUnit || ''}
                  onChange={handleChange('processUnit')}
                  displayEmpty
                  IconComponent={KeyboardArrowDown}
                  sx={inputStyles}
                >
                  <MenuItem value="">Chọn đơn vị tái chế</MenuItem>
                  {proccessingUnits.map((unit) => (
                    <MenuItem key={unit.id} value={unit.id}>
                      {unit.display_name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.collectionUnit && (
                  <Typography variant="caption" color="error">
                    {errors.collectionUnit}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* GHI CHÚ */}
            <Grid item xs={6}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: '#0088cc' }}>
                GHI CHÚ
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Nhập ghi chú...."
                value={formData.notes}
                onChange={handleChange('notes')}
                sx={inputStyles}
              />
            </Grid>

            {/* UPLOAD */}
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <IconButton sx={uploadButtonStyles} onClick={() => imageInputRef.current.click()}>
                    <ImageOutlined sx={{ fontSize: 40 }} />
                  </IconButton>
                  <Typography variant="caption" sx={{ display: 'block', color: '#0088cc' }}>
                    UPLOAD<br />HÌNH ẢNH
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    onChange={handleFileChange(setImageFile)}
                    style={{ display: 'none' }}
                  />
                  {(imageFile || existingImageUrl) && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'relative' }}>
                      <Typography variant="caption" sx={{ bgcolor: '#f1f1f1', px: 1, py: 0.5, borderRadius: 1 }}>
                      {imageFile
                          ? shortenFileName(imageFile.name)
                          : shortenFileName(existingImageUrl.split('/').pop())}
                      </Typography>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: '-18px',
                          right: '-15px',
                          bgcolor: 'white',
                          color: 'red',
                          '&:hover': { bgcolor: '#f8d7da' },
                        }}
                        size="small"
                        onClick={() => {
                          setImageFile(null);
                          if (isEdit) setExistingImageUrl(''); // Xóa URL cũ nếu ở chế độ edit
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                  <IconButton sx={uploadButtonStyles} onClick={() => fileInputRef.current.click()}>
                    <UploadFile sx={{ fontSize: 40 }} />
                  </IconButton>
                  <Typography variant="caption" sx={{ display: 'block', color: '#0088cc' }}>
                    UPLOAD<br />BIÊN BẢN
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange(setDocFile)}
                    style={{ display: 'none' }}
                  />
                  {(docFile || existingDocUrl) && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'relative' }}>
                      <Typography variant="caption" sx={{ bgcolor: '#f1f1f1', px: 1, py: 0.5, borderRadius: 1 }}>
                        {docFile
                            ? shortenFileName(docFile.name)
                            : shortenFileName(existingDocUrl.split('/').pop())}
                      </Typography>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: '-18px',
                          right: '-15px',
                          bgcolor: 'white',
                          color: 'red',
                          '&:hover': { bgcolor: '#f8d7da' },
                        }}
                        size="small"
                        onClick={() => {
                          setDocFile(null);
                          if (isEdit) setExistingDocUrl(''); // Xóa URL cũ nếu ở chế độ edit
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              sx={{ bgcolor: '#ff7f50', '&:hover': { bgcolor: '#ff6347' }, px: 4, py: 1, borderRadius: 2 }}
              type="submit"
              disabled={loading}
            >
              {isEdit ? 'CẬP NHẬT' : 'TẠO ĐƠN'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default DataInputAdminPage;
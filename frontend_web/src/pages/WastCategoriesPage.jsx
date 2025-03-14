import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Tabs,
  Tab,
  Alert,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { Add, Delete, Edit} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { createWasteDetail, createWasteGroup, createWasteType, deletedDetail, deletedGroup, deletedType, listWasteGroup } from '../store/features/wasteCategorySlice';
import { toast } from 'react-toastify';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00BCD4',
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
    h5: {
      fontWeight: 600,
    },
  },
});

const WastCategoriesPage = () => {
  const dispatch = useDispatch();
  const {listWasteGroups, loading } = useSelector(state => state.wasteCategory);
  
  const [tabValue, setTabValue] = useState(0);
  const [newGroupName, setNewGroupName] = useState('');
  const [newTypeName, setNewTypeName] = useState('');
  const [newDetailName, setNewDetailName] = useState('');
  const [inputError, setInputError] = useState('')
  const [inputTypeError, setInputTypeError] = useState('')
  const [inputDetailError, setInputDetailError] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [editMode, setEditMode] = useState(null);

  useEffect(()=>{
    if(!listWasteGroups?.length) dispatch(listWasteGroup())
  },[dispatch, loading, listWasteGroups?.length])
  

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Add new waste group
  const handleAddGroup = async () => {
    setInputError('');

    if(!newGroupName.trim()){
      setInputError('Vui lòng nhập tên nhóm rác.');
      return;
    }
    
    const duplicate = listWasteGroups.some(
      group => group.waste_group_name.trim().toLowerCase() === newGroupName.trim().toLowerCase()
    )

    if(duplicate){
      setInputError('Tên nhóm rác đã tồn tại');
      return;
    }

    const groupData = {
      waste_group_name: newGroupName.trim().toUpperCase(),
    };

    try {
      await dispatch(createWasteGroup(groupData));
      setNewGroupName('');
      toast.success('Thêm nhóm rác thành công.');

      dispatch(listWasteGroup());
    } catch (error) {
      console.log(error);
      toast.error('Có lỗi xảy ra khi thêm nhóm rác.')
    }
  };

  // Add new waste type
  const handleAddType = async () => {
    
    setInputTypeError('');

    if (!selectedGroup) {
      setInputTypeError('Vui lòng chọn nhóm rác');
      return;
    }
    
    if (!newTypeName || newTypeName.trim() === '') {
      setInputTypeError('Vui lòng nhập tên loại rác');
      return;
    }
    
    const selectedGroupObject = listWasteGroups.find(
      group => group.waste_group_name === selectedGroup
    );
    
    if (!selectedGroupObject) {
      setInputTypeError('Không tìm thấy nhóm rác đã chọn');
      return;
    }
    
    const waste_types = selectedGroupObject.waste_type || [];
    
    const duplicate = waste_types.some(
      type => type.waste_type_name.trim().toLowerCase() === newTypeName.trim().toLowerCase()
    );
    
    if (duplicate) {
      setInputTypeError('Tên loại rác đã tồn tại trong nhóm này');
      return;
    }
    
    const typeData = {
      waste_group_id: selectedGroupObject.id,
      waste_type_name: newTypeName.trim().toUpperCase(),
    };
    
    try {
      await dispatch(createWasteType(typeData));
      
      setNewTypeName('');
      setSelectedGroup('');
      toast.success('Thêm loại rác thành công');

      dispatch(listWasteGroup());
      
    } catch (error) {
      console.log(error);
      toast.error('Có lỗi xảy ra khi thêm loại rác');
    }
  };

  // Add new detail
  const handleAddDetail = async () => {
    setInputDetailError('');

    if (!selectedGroup) {
      setInputDetailError('Vui lòng chọn nhóm rác');
      return;
    }

    if (!selectedType) {
      setInputDetailError('Vui lòng chọn loại rác');
      return;
    }
    
    if (!newDetailName || newDetailName.trim() === '') {
      setInputDetailError('Vui lòng nhập chi tiết loại rác');
      return;
    }
    
    const selectedGroupObject = listWasteGroups.find(
      group => group.waste_group_name === selectedGroup
    );
    
    if (!selectedGroupObject) {
      setInputDetailError('Không tìm thấy nhóm rác đã chọn');
      return;
    }
    
    const waste_type = selectedGroupObject.waste_type || [];
    
    const selectedTypeObject = waste_type.find(
      type => type.waste_type_name === selectedType
    );
    
    if (!selectedTypeObject) {
      setInputDetailError('Không tìm thấy loại rác đã chọn');
      return;
    }

    const waste_detail = selectedTypeObject.waste_detail || [];
    
    const duplicate = waste_detail.some(
      type => type.waste_detail_name.trim().toLowerCase() === newDetailName.trim().toLowerCase()
    );
    
    if (duplicate) {
      setInputDetailError('Tên loại rác đã tồn tại trong nhóm này');
      return;
    }
    
    const typeData = {
      waste_group_id: selectedGroupObject.id,
      waste_type_id: selectedTypeObject.id,
      waste_detail_name: newDetailName.trim().toUpperCase(),
    };
    
    try {
      await dispatch(createWasteDetail(typeData));
      
      setNewDetailName('');
      setSelectedGroup('');
      setSelectedType('');
      toast.success('Thêm loại rác thành công');

      dispatch(listWasteGroup());
      
    } catch (error) {
      console.log(error);
      toast.error('Có lỗi xảy ra khi thêm loại rác');
    }
  };

  // Delete item
  const handleDelete = async (groupId, typeId = null, detailId = null) => {
  
    if (detailId !== null) {
      try {
        await dispatch(deletedDetail(detailId));
        toast.success('Xóa chi tiết loại rác thành công');
  
        dispatch(listWasteGroup());
        
      } catch (error) {
        console.log(error);
        toast.error('Có lỗi xảy ra khi xóa chi tiết loại rác');
      }
    } else if (typeId !== null) {
      try {
        await dispatch(deletedType(typeId));
        toast.success('Xóa loại rác thành công');
  
        dispatch(listWasteGroup());
        
      } catch (error) {
        console.log(error);
        toast.error('Có lỗi xảy ra khi xóa loại rác');
      }
    } else {
      try {
        await dispatch(deletedGroup(groupId));
        toast.success('Xóa nhóm rác thành công');
  
        dispatch(listWasteGroup());
        
      } catch (error) {
        console.log(error);
        toast.error('Có lỗi xảy ra khi xóa nhóm rác');
      }
    }
    
  };

  const handleEdit = (groupId, typeId = null, detailId = null) => {
    setEditMode({ groupId, typeId, detailId });
  };

  // Save edit (placeholder for save functionality)
  const handleSaveEdit = () => {
    // Save edits and exit edit mode
    setEditMode(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{mx: 'auto', p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, color: '#0288D1', fontWeight: 'bold' }}>
          DANH MỤC CHẤT THẢI
        </Typography>
        
        <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label="THÊM NHÓM RÁC" />
            <Tab label="THÊM LOẠI RÁC" />
            <Tab label="THÊM CHI TIẾT" />
          </Tabs>
          
          {/* Add Group Tab */}
          {tabValue === 0 && (
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2} >
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="TÊN NHÓM"
                    variant="outlined"
                    value={newGroupName}
                    onChange={(e) => { 
                      setNewGroupName(e.target.value);
                      setInputError('');
                    }}
                    loading={loading}
                    error={!!inputError}
                    helperText={inputError}
                  />

                </Grid>
                <Grid item xs={12} md={6}>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={handleAddGroup}
                    startIcon={<Add />}
                    sx={{ height: '56px' }}
                  >
                    THÊM NHÓM RÁC
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {/* Add Type Tab */}
          {tabValue === 1 && (
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2} >
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth error={!!inputTypeError && !selectedGroup}>
                    <InputLabel>TÊN NHÓM</InputLabel>
                    <Select
                      value={selectedGroup}
                      label="TÊN NHÓM"
                      onChange={(e) => {
                        setSelectedGroup(e.target.value);
                        setInputTypeError('');
                        }}
                    >
                      {listWasteGroups.map((group) => (
                        <MenuItem key={group.id} value={group.waste_group_name}>
                          {group.waste_group_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {!selectedGroup && !!inputTypeError && (
                      <FormHelperText>{inputTypeError}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="TÊN LOẠI"
                    variant="outlined"
                    value={newTypeName}
                    onChange={(e) => {
                      setNewTypeName(e.target.value);
                      setInputError('');
                    }}
                    error={!!inputTypeError && selectedGroup}
                    helperText={selectedGroup && inputTypeError ? inputTypeError : ''}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={handleAddType}
                    startIcon={loading ? <CircularProgress size={24} /> : <Add />}
                    sx={{ height: '56px' }}
                    disabled={!selectedGroup || loading}
                  >
                    LƯU LẠI
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {/* Add Detail Tab */}
          {tabValue === 2 && (
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2} >
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth error={!!inputDetailError && !selectedGroup}>
                    <InputLabel>TÊN NHÓM</InputLabel>
                    <Select
                      value={selectedGroup}
                      label="TÊN NHÓM"
                      onChange={(e) => {
                        setSelectedGroup(e.target.value);
                        setInputTypeError('');
                        }}
                    >
                      {listWasteGroups.map((group) => (
                        <MenuItem key={group.id} value={group.waste_group_name}>
                          {group.waste_group_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {!selectedGroup && !!inputDetailError && (
                      <FormHelperText>{inputDetailError}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth error={!!inputDetailError && !selectedGroup && !selectedType}>
                    <InputLabel>TÊN LOẠI</InputLabel>
                    <Select
                      value={selectedType}
                      label="TÊN LOẠI"
                      onChange={(e) => {
                        setSelectedType(e.target.value);
                        setInputTypeError('');
                      }}
                      disabled={!selectedGroup}
                    >
                      {listWasteGroups
                        .find(group => group.waste_group_name === selectedGroup)?.waste_type
                        .map((type) => (
                          <MenuItem key={type.id} value={type.waste_type_name}>
                            {type.waste_type_name}
                          </MenuItem>
                        )) || []}
                    </Select>
                    {!selectedType && !!inputDetailError && (
                      <FormHelperText>{inputDetailError}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="CHI TIẾT"
                    variant="outlined"
                    value={newDetailName}
                    onChange={(e) => {
                      setNewDetailName(e.target.value);
                      setInputDetailError('');
                    }}
                    error={!!inputDetailError && selectedGroup && selectedType}
                    helperText={selectedGroup && selectedType && inputDetailError ? inputDetailError : ''}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={handleAddDetail}
                    startIcon={loading ? <CircularProgress size={24} /> : <Add />}
                    sx={{ height: '56px' }}
                    disabled={!selectedGroup || !selectedType || loading}
                  >
                    LƯU LẠI
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>

        <Typography variant="h5" sx={{ mb: 2, color: '#0288D1', fontWeight: 'bold' }}>
          DANH MỤC
        </Typography>
        
        <Grid container spacing={3}>
          {listWasteGroups.map((group) => (
            <Grid item xs={12} md={3} lg={4} key={group.id}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ 
                    bgcolor: '#00BCD4', 
                    py: 1, 
                    px: 2, 
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Typography variant="h7" color="white" >
                      {group.waste_group_name}
                    </Typography>
                    <Box>
                      <IconButton size="small" sx={{ color: 'white' }} onClick={() => handleEdit(group.id)}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small" sx={{ color: 'white' }} onClick={() => handleDelete(group.id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <List dense>
                    {group.waste_type.map((type) => (
                      <React.Fragment key={type.id}>
                        <ListItem>
                          <ListItemText 
                            primary={type.waste_type_name}
                            secondary={
                              type.waste_detail.length > 0 && (
                                <Box sx={{ mt: 1 }}>
                                  {type.waste_detail.map((detail) => (
                                    <Chip 
                                      key={detail.id}
                                      label={detail.waste_detail_name}
                                      size="small"
                                      sx={{ mr: 1, mb: 1 }}
                                      onDelete={() => handleDelete(group.id, type.id, detail.id)}
                                    />
                                  ))}
                                </Box>
                              )
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" size="small" onClick={() => handleEdit(group.id, type.id)}>
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton edge="end" size="small" onClick={() => handleDelete(group.id, type.id)}>
                              <Delete fontSize="small" />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Alert severity="info" sx={{ mt: 3 }}>
          Tất cả các nhóm đều có thể chỉnh sửa, xóa
        </Alert>
      </Box>
    </ThemeProvider>
  );
};

export default WastCategoriesPage;
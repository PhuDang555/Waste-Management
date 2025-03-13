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
  Alert
} from '@mui/material';
import { Add, Delete, Edit} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { createWasteGroup, listWasteGroup } from '../store/features/wasteCategorySlice';
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
  const {listWasteGroups, loading, error } = useSelector(state => state.wasteCategory);
  // State management
  const [tabValue, setTabValue] = useState(0);
  const [wasteGroups, setWasteGroups] = useState([
    { 
      id: 1, 
      name: 'RÁC TÁI CHẾ',
      types: [
        { id: 1, name: 'Giấy', details: [] },
        { 
          id: 2, 
          name: 'Nhựa', 
          details: [
            { id: 1, name: 'PET' },
            { id: 2, name: 'PP' },
            { id: 3, name: 'HDPE' },
            { id: 4, name: 'Bao bì mềm' },
          ] 
        },
        { id: 3, name: 'Kim loại', details: [] },
      ]
    },
    { id: 2, name: 'NHÓM RÁC THỰC PHẨM', types: [] },
    { id: 3, name: 'NHÓM RÁC KHÁC', types: [] },
    { id: 4, name: 'NHÓM RÁC KHÁC NỮA', types: [] },
  ]);
  
  const [newGroupName, setNewGroupName] = useState('');
  const [inputError, setInputError] = useState('')
  const [newTypeName, setNewTypeName] = useState('');
  const [newDetailName, setNewDetailName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [editMode, setEditMode] = useState(null);

  useEffect(()=>{
    if(!listWasteGroups?.length) dispatch(listWasteGroup())
  },[dispatch, listWasteGroups?.length])
  // Handle tab change
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

    const duplicate = wasteGroups.some(
      group => group.name.trim().toLowerCase() === newGroupName.trim().toLowerCase()
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
    } catch (error) {
      console.log(error);
      toast.error('Có lỗi xảy ra khi thêm nhóm rác.')
    }
  };

  // Add new waste type
  const handleAddType = () => {
    if (newTypeName.trim() && selectedGroup) {
      const updatedGroups = wasteGroups.map(group => {
        if (group.name === selectedGroup) {
          return {
            ...group,
            types: [...group.types, { id: group.types.length + 1, name: newTypeName, details: [] }]
          };
        }
        return group;
      });
      setWasteGroups(updatedGroups);
      setNewTypeName('');
    }
  };

  // Add new detail
  const handleAddDetail = () => {
    if (newDetailName.trim() && selectedGroup && selectedType) {
      const updatedGroups = wasteGroups.map(group => {
        if (group.name === selectedGroup) {
          return {
            ...group,
            types: group.types.map(type => {
              if (type.name === selectedType) {
                return {
                  ...type,
                  details: [...type.details, { id: type.details.length + 1, name: newDetailName }]
                };
              }
              return type;
            })
          };
        }
        return group;
      });
      setWasteGroups(updatedGroups);
      setNewDetailName('');
    }
  };

  // Delete item
  const handleDelete = (groupId, typeId = null, detailId = null) => {
    let updatedGroups = [...wasteGroups];
    
    if (detailId !== null) {
      // Delete detail
      updatedGroups = updatedGroups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            types: group.types.map(type => {
              if (type.id === typeId) {
                return {
                  ...type,
                  details: type.details.filter(detail => detail.id !== detailId)
                };
              }
              return type;
            })
          };
        }
        return group;
      });
    } else if (typeId !== null) {
      // Delete type
      updatedGroups = updatedGroups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            types: group.types.filter(type => type.id !== typeId)
          };
        }
        return group;
      });
    } else {
      // Delete group
      updatedGroups = updatedGroups.filter(group => group.id !== groupId);
    }
    
    setWasteGroups(updatedGroups);
  };

  // Edit item (placeholder for edit functionality)
  const handleEdit = (groupId, typeId = null, detailId = null) => {
    // Set edit mode identifier
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
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>TÊN NHÓM</InputLabel>
                    <Select
                      value={selectedGroup}
                      label="TÊN NHÓM"
                      onChange={(e) => setSelectedGroup(e.target.value)}
                    >
                      {listWasteGroups.map((group) => (
                        <MenuItem key={group.id} value={group.waste_group_name}>
                          {group.waste_group_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="TÊN LOẠI"
                    variant="outlined"
                    value={newTypeName}
                    onChange={(e) => setNewTypeName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={handleAddType}
                    startIcon={<Add />}
                    sx={{ height: '56px' }}
                    disabled={!selectedGroup}
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
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>TÊN NHÓM</InputLabel>
                    <Select
                      value={selectedGroup}
                      label="TÊN NHÓM"
                      onChange={(e) => setSelectedGroup(e.target.value)}
                    >
                      {wasteGroups.map((group) => (
                        <MenuItem key={group.id} value={group.name}>
                          {group.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>TÊN LOẠI</InputLabel>
                    <Select
                      value={selectedType}
                      label="TÊN LOẠI"
                      onChange={(e) => setSelectedType(e.target.value)}
                      disabled={!selectedGroup}
                    >
                      {wasteGroups
                        .find(group => group.name === selectedGroup)?.types
                        .map((type) => (
                          <MenuItem key={type.id} value={type.name}>
                            {type.name}
                          </MenuItem>
                        )) || []}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="CHI TIẾT"
                    variant="outlined"
                    value={newDetailName}
                    onChange={(e) => setNewDetailName(e.target.value)}
                    disabled={!selectedType}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={handleAddDetail}
                    startIcon={<Add />}
                    sx={{ height: '56px' }}
                    disabled={!selectedType}
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
          {wasteGroups.map((group) => (
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
                      {group.name}
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
                    {group.types.map((type) => (
                      <React.Fragment key={type.id}>
                        <ListItem>
                          <ListItemText 
                            primary={type.name}
                            secondary={
                              type.details.length > 0 && (
                                <Box sx={{ mt: 1 }}>
                                  {type.details.map((detail) => (
                                    <Chip 
                                      key={detail.id}
                                      label={detail.name}
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
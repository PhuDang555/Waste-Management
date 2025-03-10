import { 
  Box, 
  Typography, 
  Button,
  Grid,
  Switch
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/features/authSlice';
import { listFeaturePermission, updateListFeaturePermission } from '../store/features/featurePermissionSlice';
import { toast } from 'react-toastify';

const PermissionsManagement = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { featurePermissions, error, loading } = useSelector(state => state.featurePermission);

  const [permissions, setPermissions] = useState([]);
  const [originalPermissions, setOriginalPermissions] = useState([]);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchUser());
    }
  }, [isAuthenticated, user, dispatch]);
  
  useEffect(() => {
    if (user && user.id) {
      dispatch(listFeaturePermission(user.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (featurePermissions && featurePermissions.length > 0) {
      setPermissions(featurePermissions);
      setOriginalPermissions(featurePermissions);
    }
  }, [featurePermissions]);

  if (loading) return <Typography>Đang tải...</Typography>;
  if (error) return <Typography>Lỗi: {error.message || error}</Typography>;
  if (!featurePermissions) return <Typography>Không tìm thấy dữ liệu</Typography>;
  
  const handleToggle = (id) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((permission) =>
        permission.id === id
          ? { ...permission, is_active: !permission.is_active }
          : permission
      )
    );
  };

  const getChangedPermissions = () => {
    return permissions.filter((permission, index) => 
      permission.is_active !== originalPermissions[index].is_active
    );
  };
  console.log(getChangedPermissions());
  
  const handleUpdate = async () => {
    const changedPermissions = getChangedPermissions();

    if (changedPermissions.length > 0) {
      try {
        await dispatch(updateListFeaturePermission(changedPermissions)); 
        setOriginalPermissions(permissions);
        toast.success("Cập nhật thành công!");
      } catch (error) {
        console.log(error);
        toast.error("Cập nhật thất bại!");
      }
    } else {
      toast.warning("Không có gì thay đổi!");
    }
  }
  return (
    <Box sx={{ flex: 1, padding: 3 }}>
      <Grid container spacing={3}>
          <Grid item xs={12} md={10}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography
                  variant="h6"
                  component="div"
                  sx={{ marginRight: 3, color: '#4FC3F7' }}
                  >
                  TÊN NHÓM QUYỀN
                  </Typography>
                  <Box sx={{ border: '1px solid #4FC3F7', marginRight: 2 }}>
                  <Typography
                      variant="h6"
                      component="div"
                      sx={{ backgroundColor: '#EEEEEE', pr: 5, pl: 1, pt: 0.5, pb: 0.5 }}
                  >
                      {user?.permission_id === 1 ? 'ADMIN' 
                      : user?.permission_id === 2 ? 'QUẢN LÝ' 
                      : 'VẬN HÀNH'}
                  </Typography>
                  </Box>
              </Box>
              <Box sx={{ marginTop: 3 }}>
                  <Typography
                  variant="h6"
                  component="div"
                  sx={{ color: '#4FC3F7', marginBottom: 2 }}
                  >
                  DANH SÁCH NHÓM QUYỀN
                  </Typography>

                  <Box sx={{ width: '100%' }}>
                  {permissions.map((item) => (
                      <Box
                      key={item.id}
                      sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: 0.7,
                          backgroundColor: '#f5f5f5',
                          mb: 1,
                      }}
                      >
                      <Typography variant="body1">{item.feature.feature_name}</Typography>
                      <Switch
                        checked={item.is_active == 1 ? true : false}
                        onChange={() => handleToggle(item.id)}
                        color="primary"
                      />
                      </Box>
                  ))}
                  </Box>
              </Box>
          </Grid>

          <Grid item xs={12} md={2}>
              <Box
              sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  height: '100%',
                  // minHeight: 'calc(100vh - 64px)',
              }}
              >
              <Button
                  variant="contained"
                  sx={{
                  bgcolor: '#FF9966',
                  borderRadius: 2,
                  '&:hover': {
                      bgcolor: '#FF8844',
                  },
                  mb:1,
                  }}
                  onClick={handleUpdate}
              >
                  CẬP NHẬT
              </Button>
              </Box>
          </Grid>
      </Grid>
    </Box>
  );
};

export default PermissionsManagement;
import { 
  Box, 
  Typography, 
  Button,
  Grid,
  Switch
} from '@mui/material';
import SideBarAdmin from '../components/common/SideBarAdmin';


const PermissionsManagement = () => {
  
  // Permission list items
  const permissionItems = [
    { id: 1, title: "Nhập liệu chất thải", enabled: true },
    { id: 2, title: "Nhập liệu khối lượng tái chế", enabled: false },
    { id: 3, title: "Báo cáo thống kê", enabled: true },
    { id: 4, title: "Tạo tài khoản", enabled: false },
    { id: 5, title: "Thêm nhóm quyền", enabled: false },
    { id: 6, title: "Danh sách khách hàng", enabled: false },
    { id: 7, title: "Danh mục chất thải", enabled: false },
    { id: 8, title: "Hỗ trợ", enabled: true },
    { id: 9, title: "Chăm sóc khách hàng", enabled: false },
    { id: 10, title: "Sàn giao dịch phế liệu", enabled: true },
    { id: 11, title: "Xem thông tin chung (Quy trình thu gom - tái chế, hồ sơ năng lực, giấy phép, phương tiện, đối tác, trạm trung chuyển)", enabled: true },
    { id: 12, title: "Cập nhật thông tin chung (Quy trình thu gom - tái chế, hồ sơ năng lực, giấy phép, phương tiện, đối tác, trạm trung chuyển)", enabled: false },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', border: '2px solid #4FC3F7', borderRadius: 2 }}>
      {/* Sidebar */}
      <SideBarAdmin />
      {/* Main Content */}
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
                        VẬN HÀNH
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
                    {permissionItems.map((item) => (
                        <Box
                        key={item.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 0.5,
                            backgroundColor: '#f5f5f5',
                            mb: 1,
                        }}
                        >
                        <Typography variant="body1">{item.title}</Typography>
                        <Switch checked={item.enabled} color="primary" />
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
                    minHeight: 'calc(100vh - 64px)',
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
                >
                    CẬP NHẬT
                </Button>
                </Box>
            </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PermissionsManagement;
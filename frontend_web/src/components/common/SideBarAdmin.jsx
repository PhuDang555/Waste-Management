import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom';

const SideBarAdmin = () => {

    // Sidebar menu items
    const accountMenuItems = [
        { id: 1, title: "NHÓM QUYỀN", isHeader: false, path: "/admin/management" },
        { id: 2, title: "TẠO TÀI KHOẢN", isHeader: false, path: "/admin/management/create-account" },
        { id: 3, title: "DANH SÁCH KHÁCH HÀNG", isHeader: false, path: "/admin/management/customer-list" },
        { id: 4, title: "DANH MỤC CHẤT THẢI", isHeader: false, path: "/admin/management/waste-categories" },
    ];
    
    const generalInfoMenuItems = [
        { id: 5, title: "HỒ SƠ NĂNG LỰC", isHeader: false, path: "/admin/management/capacity" },
        { id: 6, title: "GIẤY PHÉP", isHeader: false, path: "/admin/management/licenses" },
        { id: 7, title: "PHƯƠNG TIỆN", isHeader: false, path: "/admin/management/vehicles" },
        { id: 8, title: "TRẠM TRUNG CHUYỂN", isHeader: false, path: "/admin/management/transfer-stations" },
        { id: 9, title: "ĐỐI TÁC", isHeader: false, path: "/admin/management/partners" },
        { id: 10, title: "ĐƠN VỊ THU GOM", isHeader: false, path: "/admin/management/collect-units" },
        { id: 11, title: "ĐƠN VỊ TÁI CHÊ", isHeader: false, path: "/admin/management/collectunits" },
    ];

  return (
    <Box 
        sx={{ 
            width: 300, 
            bgcolor: '#FFF5E6', 
            padding: 2, 
            borderRight: '2px solid #4FC3F7', 
            position: 'sticky',
            top: 0,
            height:'100vh',
            overflowY: 'auto'
            }}
    >
        <Typography 
        variant="h6" 
        component="div" 
        sx={{ 
            padding: 2, 
            backgroundColor: '#4FC3F7', 
            color: 'white', 
            fontWeight: 'bold', 
            marginBottom: 3,
        }}
        >
            QUẢN TRỊ
        </Typography>
        
        <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
                color: '#4FC3F7', 
                fontWeight: 'bold', 
                marginBottom: 1 
                }}
        >
        QUẢN LÝ TÀI KHOẢN
        </Typography>
        <List dense>
        {accountMenuItems.map((item) => (
            <ListItem key={item.id} sx={{ paddingY: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 24 }}>
                <CircleIcon sx={{ fontSize: 10, color: '#4FC3F7' }} />
            </ListItemIcon>
            <ListItemText 
                primary={
                <Link to={item.path}>
                    <Typography 
                        sx={{ 
                        color: '#4FC3F7', 
                        fontWeight: item.id === 1 ? 'bold' : 'normal'
                        }}
                    >
                        {item.title}
                    </Typography>
                </Link>
                } 
            />
            </ListItem>
        ))}
        </List>
        
        <Divider sx={{ my: 2 }} />

        <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
                color: '#4FC3F7', 
                fontWeight: 'bold', 
                marginBottom: 1 
                }}
        >
        THÔNG TIN CHUNG
        </Typography>
        
        <List dense>
        {generalInfoMenuItems.map((item) => (
            <ListItem key={item.id} sx={{ paddingY: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 24 }}>
                <CircleIcon sx={{ fontSize: 10, color: '#4FC3F7' }} />
            </ListItemIcon>
            <ListItemText 
                primary={
                <Link to={item.path}>
                    <Typography 
                        sx={{ 
                        color: '#4FC3F7'
                        }}
                    >
                        {item.title}
                    </Typography>
                </Link>
                } 
            />
            </ListItem>
        ))}
        </List>
    </Box>
  )
}

export default SideBarAdmin
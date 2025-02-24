import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Typography, colors } from "@mui/material";
import { images } from "../../assets";
import { ChevronLeft, Menu } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logout } from "../../store/features/authSlice";

const menus = [
  {
    title: "NHẬP LIỆU",
    icon: <MailOutlinedIcon />,
    state: "sidebar1",
    path: "/dashboard/data-input"
  },
  {
    title: "THỐNG KÊ SỐ LIỆU",
    icon: <DashboardCustomizeOutlinedIcon />,
    state: "sidebar2",
    path: "/dashboard/report"
  },
  {
    title: "QUY TRÌNH THU GOM - TÁI CHẾ",
    icon: <NotificationsOutlinedIcon />,
    state: "sidebar3",
    path: "/dashboard/recycling"
  },
  {
    title: "SÀN GIAO DỊCH PHẾ LIỆU",
    icon: <NotificationsOutlinedIcon />,
    state: "sidebar4",
    path: "/dashboard/profile"
  },
  {
    title: "QUẢN LÝ LỊCH THU GOM",
    icon: <NotificationsOutlinedIcon />,
    state: "sidebar5",
    path: "/dashboard/collect-manage"
  },
  {
    title: "THÔNG TIN CÁ NHÂN",
    icon: <NotificationsOutlinedIcon />,
    state: "sidebar6",
    path: "/dashboard/profile"
  },
  {
    title: "HỖ TRỢ",
    icon: <NotificationsOutlinedIcon />,
    state: "sidebar7",
    path: "/dashboard/support"
  }
  
];

const Sidebar = ({ sidebarWidth }) => {
  const [isOpen, setIsOpen] = useState(true);
  const activeState = "overview";
  const collapsedWidth = 65;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
    }
  }, [token, dispatch]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const MenuItem = (props) => {
    return (
      <ListItem key={props.index} disableGutters disablePadding sx={{ py: 0.5 }}>
        <ListItemButton sx={{
          borderRadius: "10px",
          bgcolor: props.isActive ? colors.green[600] : "",
          color: props.isActive ? colors.common.white : "",
          "&:hover": {
            bgcolor: props.isActive ? colors.green[600] : "",
            color: props.isActive ? colors.common.white : "",
          }
        }}>
          <ListItemText sx={{ textAlign: "center"}} primary={
            <Typography fontWeight={600}>
              {props.item.title}
            </Typography>
          } />
        </ListItemButton>
      </ListItem>
    );
  };

  const drawer = (
    <Box
      // padding={isOpen ? 3 : 1}
      // paddingBottom={0}
      // paddingTop={isOpen ? 3 : 3}
      padding={0}
      paddingBottom={0}
      paddingTop={0}
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{
        "::-webkit-scrollbar": {
          display: "none"
        },
        transition: "all 0.3s ease",
      }}
    >     
        <Paper
          elevation={0}
          square
          sx={{
            // borderTopRightRadius: "10px",
            // borderTopLeftRadius: "10px",
            // p: isOpen ? 2 : 1,
            p: 0,
            height: "100%",
            overflow: "hidden",
            boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
            transition: "all 0.3s ease",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            bgcolor: '#00bcd4',
            // bgcolor: !isOpen ? "white" : "00bcd4",
          }}
        >
          <Box sx={{ 
            display: "flex", 
            justifyContent: isOpen ? "flex-end" : "center",
            alignItems: "center",
            mb: isOpen ? 2 : 0,
            transition: "all 0.3s ease",
            // bgcolor: !isOpen ? "white" : "00bcd4",
          }}>
              <IconButton 
                onClick={toggleSidebar} 
                size="small"
                sx={{
                transform: isOpen ? "none" : "translateX(4px)",
                transition: "transform 0.3s ease"
              }}>
                {isOpen ? <ChevronLeft /> : <Menu />}
              </IconButton>
          </Box>
          <Box sx={{ 
            transform: isOpen ? "none" : "translateX(-100%)",
            opacity: isOpen ? 1 : 0,
            transition: "all 0.3s ease",
            visibility: isOpen ? "visible" : "hidden",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            color: "white",
          }}>
              <Box sx={{ textAlign: "center", mb: 2}}>            
                <img src={images.logo} alt="logo" height={60} />
              </Box>
              
              <Box sx={{ textAlign: "center", mb: 6 }}>
                {user && (
                  <Typography variant="h6" color="green" fontWeight="bold">
                    {user.username}
                  </Typography>
                )}
              </Box>
              
              <List>
                {menus.map((item, index) => (
                  <Link
                    to={item.path}
                    key={index}
                    isActive={item.state === activeState}
                  >
                    <MenuItem item={item} />
                  </Link>
                ))}
                <ListItem disableGutters disablePadding sx={{ py: 0.5 }}>
                  <ListItemButton onClick={handleLogout} sx={{
                    borderRadius: "10px",
                    "&:hover": {
                      bgcolor: colors.green[600],
                      color: colors.common.white,
                    }
                  }}>
                    <ListItemText sx={{ textAlign: "center"}} primary={
                      <Typography fontWeight={600}>
                        ĐĂNG XUẤT
                      </Typography>
                    } />
                  </ListItemButton>
                </ListItem>
              </List>
          </Box>
        </Paper>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: isOpen ? sidebarWidth : collapsedWidth },
        flexShrink: { md: 0 },
        transition: "width 0.3s ease",
        
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: isOpen ? sidebarWidth : collapsedWidth,
              borderWidth: 0,
              bgcolor: "transparent",
              transition: "width 0.3s ease",
              overflowX: "hidden",
              "::-webkit-scrollbar": {
                display: "none"
              },
              
            }
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
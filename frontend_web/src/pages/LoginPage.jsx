import { Alert, Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, LinearProgress, Stack, TextField, Typography, circularProgressClasses, colors } from "@mui/material";
import { useState } from "react";
import { images } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import Animate from "../components/common/Animate";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/features/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const [onRequest, setOnRequest] = useState(false);
  const [loginProgress, setLoginProgress] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    username:'',
    password:''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOnRequest(true);

    const interval = setInterval(() => {
      setLoginProgress(prev => prev + 100 / 40);
    }, 50);

    const result = await dispatch(loginUser(formData));
    
    if(result.payload?.token){
      setTimeout(() => {
        clearInterval(interval);
      }, 2000);
  
      setTimeout(() => {
        setIsLoggedIn(true);
      }, 2100);
  
      setTimeout(() => {
        navigate("/dashboard");
      }, 3300);
    }else{
      clearInterval(interval);
      setOnRequest(false);
      setLoginProgress(0);
    }
    
  };

  return (
    <Box
      position="relative"
      height="100vh"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      {/* background box */}
      <Box sx={{
        position: "absolute",
        right: 0,
        height: "100%",
        width: "70%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${images.loginBg})`
      }} />
      {/* background box */}

      {/* Login form */}
      <Box sx={{
        position: "absolute",
        left: 0,
        height: "100%",
        width: isLoggedIn ? "100%" : { xl: "30%", lg: "40%", md: "50%", xs: "100%" },
        transition: "all 1s ease-in-out",
        bgcolor: colors.common.white
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          opacity: isLoggedIn ? 0 : 1,
          transition: "all 0.3s ease-in-out",
          height: "100%",
          "::-webkit-scrollbar": { display: "none" }
        }}>
          {/* logo */}
          <Box sx={{ textAlign: "center", p: 5 }}>
            <Animate type="fade" delay={0.5}>
              <img src={images.logo} alt="logo" height={60}></img>
            </Animate>
          </Box>
          {/* logo */}

          {/* form */}
          <Box sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "::-webkit-scrollbar": { display: "none" }
          }}>
            <Animate type="fade" sx={{ maxWidth: 400, width: "100%" }}>
              <Box component="form" maxWidth={400} width="100%" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  {error && (
                    <Alert severity="error">
                      {error.message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.'}
                    </Alert>
                  )}
                  
                  {onRequest && (
                    <LinearProgress 
                      variant="determinate" 
                      value={loginProgress} 
                      sx={{ mb: 2 }}
                    />
                  )}
                  <TextField 
                    label="Username" 
                    fullWidth 
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    error={Boolean(error)}
                    disabled={onRequest}
                  />
                  <TextField 
                    label="Password" 
                    type="password" 
                    name="password"
                    fullWidth 
                    value={formData.password}
                    onChange={handleChange}
                    error={Boolean(error)}
                    disabled={onRequest}
                  />
                  <Button 
                    type="submit" 
                    size="large" 
                    variant="contained" 
                    color="success"
                    disabled={onRequest}
                  >
                    {onRequest ? 'Đang xử lý...' : 'Sign in'}
                  </Button>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <FormGroup>
                      <FormControlLabel control={<Checkbox />} label="Remember me" />
                    </FormGroup>
                    <Typography color="error" fontWeight="bold">
                      <Link to="#">
                        Forgot password?
                      </Link>
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Animate>
          </Box>
          {/* form */}

          {/* footer */}
          <Box sx={{ textAlign: "center", p: 5, zIndex: 2 }}>
            <Animate type="fade" delay={1}>
              <Typography
                display="inline"
                fontWeight="bold"
                sx={{ "& > a": { color: colors.red[900], ml: "5px" } }}
              >
                Don&apos;t have an account -
                <Link to="#">
                  Register now
                </Link>
              </Typography>
            </Animate>
          </Box>
          {/* footer */}

          {/* loading box */}
          {onRequest && (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                bgcolor: colors.common.white,
                zIndex: 1000
              }}
            >
              <Box position="relative">
                <CircularProgress
                  variant="determinate"
                  sx={{ color: colors.grey[200] }}
                  size={100}
                  value={100}
                />
                <CircularProgress
                  variant={onRequest ? "indeterminate" : "determinate"}
                  disableShrink={onRequest}
                  value={loginProgress}
                  size={100}
                  sx={{
                    [`& .${circularProgressClasses.circle}`]: {
                      strokeLinecap: "round"
                    },
                    position: "absolute",
                    left: 0,
                    color: colors.green[600]
                  }}
                />
              </Box>
            </Stack>
          )}
          {/* loading box */}
        </Box>
      </Box>
      {/* Login form */}
    </Box>
  );
};

export default LoginPage;
import { Box, Typography, Button, Paper } from "@mui/material";
import RecyclingIcon from "@mui/icons-material/Recycling";
import { useNavigate } from "react-router-dom";

const RecyclingProcessPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dashboard/capability");
  }
  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, minHeight: "96vh"}}>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{ 
            color: "#0088cc",
            fontWeight: 500,
            textAlign: "center"
          }}
        >
          QUY TRÌNH THU GOM - TÁI CHẾ
        </Typography>

        <Box 
          sx={{ 
            position: "relative",
            width: "100%",
            bgcolor: "#fff5f0",
            height: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <RecyclingIcon 
            sx={{ 
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: 60,
              color: "#4caf50"
            }}
          />
        </Box>
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt:4
          }}
        >
          <Button
            variant="contained"
            onClick={handleNavigate}
            sx={{
              bgcolor: "#26c6da",
              color: "white",
              px: 8,
              py: 2,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#00acc1"
              },
        
            }}
          >
            NĂNG LỰC GRAC
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RecyclingProcessPage;
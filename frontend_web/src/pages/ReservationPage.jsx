import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  ImageOutlined,
  KeyboardArrowDown
} from "@mui/icons-material";

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    owner: "SIÊU THỊ MM CN1",
    collectionUnit: "",
    wasteType: "",
    quantity: "",
    collectionDate: "",
    notes: "",
    phone:"09080222222",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box>
        <Paper elevation={3} sx={{ p: 3, minHeight: "96vh"}}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Box component="form" onSubmit={handleSubmit}>
                    {/* Title with note */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" color="primary" gutterBottom>
                        CHỦ NGUỒN THẢI: {formData.owner}
                        </Typography>
                        <Typography variant="h6" color="primary" gutterBottom>
                        LIÊN HỆ: {formData.phone}
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {/* First Row */}
                        <Grid item xs={12} md={12}>
                            <Typography variant="subtitle2" gutterBottom sx={{ color: "#0088cc" }}>
                                ĐỊA CHỈ
                            </Typography>
                            <TextField
                                fullWidth
                                rows={4}
                                value={formData.notes}
                                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                sx={{ 
                                bgcolor: "white",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#0088cc"
                                }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom sx={{ color: "#0088cc" }}>
                            LOẠI RÁC
                        </Typography>
                        <FormControl fullWidth>
                            <Select
                            value={formData.wasteType}
                            onChange={(e) => setFormData({...formData, wasteType: e.target.value})}
                            displayEmpty
                            IconComponent={KeyboardArrowDown}
                            sx={{ 
                                bgcolor: "white",
                                "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#0088cc"
                                }
                            }}
                            >
                            <MenuItem value="">NHỰA - PP</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>

                        {/* Second Row */}
                        <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom sx={{ color: "#0088cc" }}>
                            KHỐI LƯỢNG THU GOM
                        </Typography>
                        <TextField
                            fullWidth
                            value={formData.quantity}
                            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                            InputProps={{
                            endAdornment: <InputAdornment position="end">KG</InputAdornment>,
                            }}
                            sx={{ 
                            bgcolor: "white",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#0088cc"
                            }
                            }}
                        />
                        </Grid>

                        <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom sx={{ color: "#0088cc" }}>
                            NGÀY THU GOM
                        </Typography>
                        <TextField
                            fullWidth
                            type="date"
                            value={formData.collectionDate}
                            onChange={(e) => setFormData({...formData, collectionDate: e.target.value})}
                            sx={{ 
                            bgcolor: "white",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#0088cc"
                            }
                            }}
                        />
                        </Grid>

                        {/* Notes Field */}
                        <Grid item xs={6}>
                        <Typography variant="subtitle2" gutterBottom sx={{ color: "#0088cc" }}>
                            GIỜ THU GOM
                        </Typography>
                        <TextField
                                fullWidth
                                type="time"
                                value={formData.collectionTime}
                                onChange={(e) => setFormData({ ...formData, collectionTime: e.target.value })}
                                sx={{
                                    bgcolor: "white",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#0088cc",
                                    },
                                }}
                        />
                        </Grid>
                    </Grid>

                    {/* Submit Button */}
                    <Box sx={{ mt: 4, textAlign: "center" }}>
                        <Button
                        variant="contained"
                        size="large"
                        sx={{ 
                            bgcolor: "#ff7f50",
                            "&:hover": { bgcolor: "#ff6347" },
                            px: 4,
                            py: 1,
                            borderRadius: 2
                        }}
                        type="submit"
                        >
                        TẠO ĐƠN
                        </Button>
                    </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
                        <Box sx={{ textAlign: "center" }}>
                        <IconButton 
                            sx={{ 
                            bgcolor: "#40bfff", 
                            color: "white",
                            "&:hover": { bgcolor: "#0088cc" },
                            width: 120,
                            height: 120,
                            mt: 20
                            }}
                        >
                            <ImageOutlined sx={{ fontSize: 40 }} />
                        </IconButton>
                        <Typography variant="caption" sx={{ display: "block", color: "#0088cc" }}>
                            UPLOAD<br />HÌNH ẢNH
                        </Typography>
                        </Box>
                    </Box>
                </Grid> 
            </Grid>           
      </Paper>
    </Box>
  );
};

export default ReservationPage;
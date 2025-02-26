import { useEffect, useState } from "react";
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
  UploadFile,
  KeyboardArrowDown
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { listCollectingUnit, listWasteType } from "../store/features/dataInputSlice";
import { fetchUser } from "../store/features/authSlice";

const DataInputPage = () => {
  const dispatch = useDispatch();
  const { collectingUnits, wasteTypes, loading} = useSelector((state) => state.dataInput);
  
  const { user, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    owner: "SIÊU THỊ MM CN1",
    collectionUnit: "",
    wasteType: "",
    quantity: "",
    collectionDate: "",
    notes: ""
  });

  useEffect(() => {
    if(!loading) {
      if (!collectingUnits || collectingUnits.length === 0) {
        dispatch(listCollectingUnit());
      }

      if(!wasteTypes || wasteTypes.length === 0){
        dispatch(listWasteType());
      }
    }
    
  }, [dispatch, loading, collectingUnits, wasteTypes]);
  
    useEffect(() => {
      if (token) {
        dispatch(fetchUser());
      }
    }, [token, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, minHeight: "96vh",}}>
        <Box component="form" onSubmit={handleSubmit}>
          {/* Title with note */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              CHỦ NGUỒN THẢI: {user.full_name}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* First Row */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: "#0088cc" }}>
                ĐƠN VỊ THU GOM
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.collectionUnit}
                  onChange={(e) => setFormData({...formData, collectionUnit: e.target.value})}
                  displayEmpty
                  IconComponent={KeyboardArrowDown}
                  sx={{ 
                    bgcolor: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#0088cc"
                    }
                  }}
                >
                  <MenuItem value="">Chọn đơn vị thu gom</MenuItem>
                  {collectingUnits.map((unit) => (
                    <MenuItem key={unit.id} value={unit.id}>
                      {unit.display_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  <MenuItem value="">Chọn loại rác thải</MenuItem>
                  {wasteTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.waste_type_name}
                    </MenuItem>
                  ))}
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
                THỜI GIAN THU GOM
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
                GHI CHÚ
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Nhập ghi chú...."
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

            {/* Upload Buttons */}
            <Grid item xs={6}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
                <Box sx={{ textAlign: "center" }}>
                  <IconButton 
                    sx={{ 
                      bgcolor: "#40bfff", 
                      color: "white",
                      "&:hover": { bgcolor: "#0088cc" },
                      width: 80,
                      height: 80,
                      mb: 1
                    }}
                  >
                    <ImageOutlined sx={{ fontSize: 40 }} />
                  </IconButton>
                  <Typography variant="caption" sx={{ display: "block", color: "#0088cc" }}>
                    UPLOAD<br />HÌNH ẢNH
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "center" }}>
                  <IconButton 
                    sx={{ 
                      bgcolor: "#40bfff", 
                      color: "white",
                      "&:hover": { bgcolor: "#0088cc" },
                      width: 80,
                      height: 80,
                      mb: 1
                    }}
                  >
                    <UploadFile sx={{ fontSize: 40 }} />
                  </IconButton>
                  <Typography variant="caption" sx={{ display: "block", color: "#0088cc" }}>
                    UPLOAD<br />BIÊN BẢN
                  </Typography>
                </Box>
              </Box>
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
              HOÀN TẤT
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default DataInputPage;
import {
  Box,
  Typography,
  Grid,
  Paper,
  Pagination,
} from "@mui/material";
import CollectionItem from "../components/common/CollectionItem";

const CollectionManagementPage = () => {
  
  const sampleData = [
    {
      id: 1,
      createdAt: "30.10.2024, 17:00",
      collectionDate: "31.10.2024",
      wasteType: "Rác thải nhựa",
      quantity: 300
    },
  ];

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, minHeight: "100vh"}}>
            {/* Page Header */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5">
         QUẢN LÝ LỊCH THU GOM
        </Typography>
        {/* Add any header actions/filters here */}
      </Box>

      {/* Grid of Collection Items */}
      <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => ( // Showing 6 items for demonstration
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <CollectionItem data={sampleData[0]} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ 
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        bottom: 0, 
        left: "50%", 
        py: 2,
       }}>
        <Pagination 
          count={10} 
          color="primary" 
          size="large"
        />
      </Box>
      </Paper>
    </Box>
  );
};

export default CollectionManagementPage;
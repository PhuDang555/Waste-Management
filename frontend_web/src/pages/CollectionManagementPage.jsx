import {
  Box,
  Typography,
  Grid,
  Paper,
  Pagination,
  CircularProgress
} from "@mui/material";
import CollectionItem from "../components/common/CollectionItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser } from "../store/features/authSlice";
import { listDataInput } from "../store/features/dataInputSlice"; // Giả sử action là getDataInputList

const CollectionManagementPage = () => {
  const dispatch = useDispatch();
  const { dataInputs, error, loading } = useSelector(state => state.dataInput);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Chỉ gọi fetchUser nếu không có user trong state
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchUser());
    }
  }, [isAuthenticated, user, dispatch]);

  // Gọi API lấy danh sách khi có user
  useEffect(() => {
    if (user && user.id) {
      dispatch(listDataInput(user.id));
    }
  }, [user, dispatch]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil((dataInputs?.length || 0) / itemsPerPage);
  const displayedItems = dataInputs ? dataInputs.slice((page - 1) * itemsPerPage, page * itemsPerPage) : [];

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, minHeight: "100vh", position: "relative" }}>
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5">
            QUẢN LÝ LỊCH THU GOM
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: "center", color: "error.main", mt: 4 }}>
            <Typography variant="h6">Đã xảy ra lỗi khi tải dữ liệu</Typography>
            <Typography variant="body2">{error.message || "Vui lòng thử lại sau"}</Typography>
          </Box>
        ) : !dataInputs || dataInputs.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6">Không có dữ liệu thu gom</Typography>
          </Box>
        ) : (
          <Grid container spacing={1}>
            {displayedItems.map((item) => (
              <Grid item xs={12} key={item.id}>
                <CollectionItem data={item} />
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && dataInputs && dataInputs.length > 0 && (
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            position: "sticky",
            bottom: 16,
            mt: 4
          }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              // sx={{ 
              //   bgcolor: "white", 
              //   p: 1, 
              //   borderRadius: 2,
              //   boxShadow: 2
              // }}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CollectionManagementPage;
import { Box, Typography, Card, CardContent, Paper, IconButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import ScaleIcon from '@mui/icons-material/Scale';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getDataInputId } from '../store/features/dataInputSlice';
import CloseIcon from '@mui/icons-material/Close';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
const CollectionDetailPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams(); // Lấy id từ URL
    const { selectedDataInput, loading, error } = useSelector((state) => state.dataInput);
  
    useEffect(() => {
      dispatch(getDataInputId(id));
    }, [dispatch, id]);
    console.log(selectedDataInput);
    if (loading) return <Typography>Đang tải...</Typography>;
    if (error) return <Typography>Lỗi: {error.message || error}</Typography>;
    if (!selectedDataInput) return <Typography>Không tìm thấy dữ liệu</Typography>;
  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, minHeight: "96vh"}}>
        <Typography
            variant="h5"
            sx={{
            color: '#0088cc',
            fontWeight: 500,
            mb: 3
            }}
        >
            QUẢN LÝ LỊCH THU GOM
        </Typography>

        <Card
            sx={{
            borderRadius: 4,
            border: '2px solid #26c6da',
            position: 'relative',
            overflow: 'visible'
            }}
        >
            {/* Date Badge */}
            <Box
            sx={{
                position: 'absolute',
                top: -20,
                left: 20,
                bgcolor: '#ff7043',
                color: 'white',
                px: 3,
                py: 1,
                borderRadius: 2,
                boxShadow: 1
            }}
            >
            {selectedDataInput.created_at}
            </Box>

            <CardContent sx={{ pt: 4 }}>
                {/* Details List */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AccessTimeIcon color="primary" />
                    <Typography>
                        <strong>Thời gian thu gom:</strong> {selectedDataInput.processing_time}
                    </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <DeleteIcon color="primary" />
                    <Typography>
                        <strong>Loại rác tái chế:</strong> {selectedDataInput.waste_type_id}
                    </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <ScaleIcon color="primary" />
                    <Typography>
                        <strong>Khối lượng:</strong> {selectedDataInput.volume}kg
                    </Typography>
                    </Box>
                </Box>

                {/* Images Container */}
                <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', mt: 3 }}>
                    {/* Ảnh 1 */}
                    <Box
                        sx={{
                        width: 200,
                        height: 150,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #90caf9',
                        position: 'relative',
                        overflow: 'hidden',
                        }}
                    >
                        {selectedDataInput.image ? (
                        <>
                            <img
                            src={selectedDataInput.image}
                            alt="Ảnh 1"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <IconButton
                            sx={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                bgcolor: 'rgba(255, 255, 255, 0.7)',
                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
                            }}
                            size="small"
                            // onClick={() => handleDeleteImage(0)}
                            >
                            <CloseIcon fontSize="small" color="error" />
                            </IconButton>
                        </>
                        ) : (
                        <ImageOutlinedIcon color="primary" fontSize="large" />
                        )}
                    </Box>

                    {/* Ảnh 2 */}
                    <Box
                        sx={{
                        width: 200,
                        height: 150,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #90caf9',
                        position: 'relative',
                        overflow: 'hidden',
                        }}
                    >
                        {selectedDataInput.image ? (
                        <>
                            <img
                            src={selectedDataInput.image}
                            alt="Ảnh 2"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <IconButton
                            sx={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                bgcolor: 'rgba(255, 255, 255, 0.7)',
                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
                            }}
                            size="small"
                            // onClick={() => handleDeleteImage(1)}
                            >
                            <CloseIcon fontSize="small" color="error" />
                            </IconButton>
                        </>
                        ) : (
                        <ImageOutlinedIcon color="primary" fontSize="large" />
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
      </Paper>
    </Box>
  );
};

export default CollectionDetailPage;
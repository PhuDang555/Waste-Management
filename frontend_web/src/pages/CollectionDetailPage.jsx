import { Box, Typography, Card, CardContent, Paper, Button} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import ScaleIcon from '@mui/icons-material/Scale';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDataInputId } from '../store/features/dataInputSlice';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ImageModal from '../components/common/ImageModal';
import { fetchUser } from '../store/features/authSlice';
const CollectionDetailPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ADMIN = 1;
    const { id } = useParams(); // Lấy id từ URL
    const { selectedDataInput, loading, error } = useSelector((state) => state.dataInput);
    const { user, isAuthenticated } = useSelector(state => state.auth);

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); 

    const handleOpen = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage(null);
    };
    
    const previousPage = () => {
        navigate(-1); // Go back to previous page
      };

    const handleTime = (time) => {
        const formattedDate = new Date(time).toISOString().slice(0, 19).replace("T", " ");
        return formattedDate;
      };

    const handleEdit = () => {

        if(user?.permission_id == ADMIN) {
            navigate('/admin/data-input', { state: { editData: selectedDataInput, isEdit: true } });
        } else{
            navigate('/dashboard/data-input', { state: { editData: selectedDataInput, isEdit: true } });
        }
    }
    
    useEffect(() => {
        if (isAuthenticated && !user) {
          dispatch(fetchUser());
        }
      }, [isAuthenticated, user, dispatch]);
    

    useEffect(() => {
      dispatch(getDataInputId(id));
    }, [dispatch, id]);
    
    if (loading) return <Typography>Đang tải...</Typography>;
    if (error) return <Typography>Lỗi: {error.message || error}</Typography>;
    if (!selectedDataInput) return <Typography>Không tìm thấy dữ liệu</Typography>;

  return (
    <>
        <Box>
        <Paper elevation={3} sx={{ p: 3, minHeight: "100vh"}}>
            <Box
                sx={{
                    display:"flex",
                    justifyContent: "space-between",
                    alignItems:"center",
                    mb: 3
                }}
            >
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
                <Box>
                    {user?.permission_id == 1 && 
                    <Button
                        variant='contained'
                        size='large'
                        sx={{ bgcolor: '#ff7f50', '&:hover': { bgcolor: '#ff6347' }, px: 4, py: 1, borderRadius: 2, mr: 2 }}
                        type='submit'
                        loading={loading}
                        onClick={previousPage}
                    >
                        Trở lại
                    </Button>
                    }   
                    <Button
                        variant='contained'
                        size='large'
                        sx={{ bgcolor: '#ff7f50', '&:hover': { bgcolor: '#ff6347' }, px: 4, py: 1, borderRadius: 2 }}
                        type='submit'
                        loading={loading}
                        onClick={handleEdit}
                    >
                        Chỉnh sửa
                    </Button>
                </Box>
            </Box>
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
                {handleTime(selectedDataInput.created_at)}
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
                            <strong>Loại rác tái chế:</strong> {selectedDataInput.waste_type.waste_type_name}
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
                                cursor: 'pointer',
                                
                            }}
                            onClick={() => handleOpen(selectedDataInput.image)}
                        >
                            {selectedDataInput.image ? (
                            <>
                                <img
                                src={selectedDataInput.image}
                                alt="Ảnh 1"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
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
                            cursor: 'pointer',
                            }}
                            onClick={() => handleOpen(selectedDataInput.image)}
                        >
                            {selectedDataInput.image ? (
                            <>
                                <img
                                src={selectedDataInput.image}
                                alt="Ảnh 2"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
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
        {/* Sử dụng ImageModal */}
        <ImageModal open={open} onClose={handleClose} image={selectedImage} />
    </>
      
  );
};

export default CollectionDetailPage;
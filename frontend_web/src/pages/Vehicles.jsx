import { 
  Box, 
  Typography, 
  Button,
  Grid,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Modal,
  Link,
  Icon
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/features/authSlice';
import { listFeaturePermission, updateListFeaturePermission } from '../store/features/featurePermissionSlice';
import { toast } from 'react-toastify';
import { 
  Home as HomeIcon, 
  InsertDriveFile as FileIcon, 
  Image as ImageIcon, 
  PictureAsPdf as PdfIcon, 
  TableChart as ExcelIcon, 
  Description as WordIcon,
  Close as CloseIcon 
} from '@mui/icons-material'; 
import { useNavigate } from 'react-router-dom';

const Vehicles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { featurePermissions, error, loading } = useSelector(state => state.featurePermission);

  // Fake data phong phú hơn
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, type: 'image', name: 'ảnh phong cảnh.jpg', url: 'https://via.placeholder.com/300x200' },
    { id: 2, type: 'pdf', name: 'hợp đồng mẫu.pdf', url: '#' },
    { id: 3, type: 'image', name: 'chụp màn hình.png', url: 'https://via.placeholder.com/300x200' },
    { id: 4, type: 'excel', name: 'danh sách nhân viên.xlsx', url: '#' },
    { id: 5, type: 'word', name: 'báo cáo tháng 3.docx', url: '#' },
    { id: 6, type: 'image', name: 'logo công ty.jpg', url: 'https://via.placeholder.com/300x200' },
    { id: 7, type: 'pdf', name: 'hướng dẫn sử dụng.pdf', url: '#' },
    { id: 8, type: 'excel', name: 'thống kê doanh thu.xls', url: '#' },
    { id: 9, type: 'word', name: 'kế hoạch dự án.docx', url: '#' },
    { id: 10, type: 'image', name: 'ảnh nhóm.jpg', url: 'https://via.placeholder.com/300x200' },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleHomeClick = () => {
    navigate('/admin');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.startsWith('image') ? 'image' :
                       file.type.includes('pdf') ? 'pdf' :
                       file.type.includes('excel') || file.type.includes('sheet') ? 'excel' : 'word';
      const newFile = {
        id: uploadedFiles.length + 1,
        type: fileType,
        name: file.name,
        url: URL.createObjectURL(file),
      };
      setUploadedFiles([...uploadedFiles, newFile]);
      toast.success(`Đã tải lên: ${file.name}`);
    }
  };

  const handleImageClick = (file) => {
    setSelectedImage(file.url);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  const handleFileOpen = (file) => {
    window.open(file.url, '_blank');
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image': return <ImageIcon sx={{ color: '#4FC3F7' }} />;
      case 'pdf': return <PdfIcon sx={{ color: '#F44336' }} />;
      case 'excel': return <ExcelIcon sx={{ color: '#4CAF50' }} />;
      case 'word': return <WordIcon sx={{ color: '#2196F3' }} />;
      default: return <FileIcon sx={{ color: '#757575' }} />;
    }
  };

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchUser());
    }
  }, [isAuthenticated, user, dispatch]);

  if (loading) return <Typography>Đang tải...</Typography>;
  if (error) return <Typography>Lỗi: {error.message || error}</Typography>;
  if (!featurePermissions) return <Typography>Không tìm thấy dữ liệu</Typography>;

  return (
    <Box sx={{ flex: 1, padding: 4, width: '100%', bgcolor: '#f9fafb' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h5" sx={{ color: '#0288D1', fontWeight: 'bold' }}>
          PHƯƠNG TIỆN
        </Typography>
        <IconButton onClick={handleHomeClick} sx={{ color: '#0288D1' }}>
          <HomeIcon />
        </IconButton>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Box sx={{ bgcolor: '#fff', p: 3, borderRadius: 2, boxShadow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#424242' }}>
                Danh sách tệp đã tải lên
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    bgcolor: '#FF5722',
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#E64A19', transform: 'scale(1.02)' },
                    transition: 'all 0.2s',
                  }}
                >
                  TẢI TỆP LÊN
                  <input
                    type="file"
                    hidden
                    onChange={handleFileUpload}
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                  />
                </Button>
              </Box>
            </Box>
            <Box
            sx={{
              maxHeight: '650px',
              overflowY: 'auto',
              pr: 1,          
              '&::-webkit-scrollbar': {
                width: '8px',     // Độ rộng thanh cuộn
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888', // Màu thanh cuộn
                borderRadius: '4px',
              }, 
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#555', // Màu khi hover
              },
            }}
          >
            <Grid container spacing={2}>
              {uploadedFiles.map((file) => (
                <Grid item xs={12} sm={6} md={3} key={file.id}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      '&:hover': { boxShadow: '0 4px 15px rgba(0,0,0,0.15)', transform: 'scale(1.02)' },
                      transition: 'all 0.2s',
                    }}
                  >
                    {file.type === 'image' ? (
                      <CardMedia
                        component="img"
                        height="160"
                        image={file.url}
                        alt={file.name}
                        sx={{ cursor: 'pointer', objectFit: 'cover' }}
                        onClick={() => handleImageClick(file)}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 160,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: '#f5f5f5',
                        }}
                      >
                        {getFileIcon(file.type)}
                      </Box>
                    )}
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getFileIcon(file.type)}
                      <Typography variant="body2" sx={{ color: '#616161' }}>
                        {file.type === 'image' ? file.name : (
                          <Link
                            href="#"
                            onClick={(e) => { e.preventDefault(); handleFileOpen(file); }}
                            underline="hover"
                            sx={{ color: '#1976D2' }}
                          >
                            {file.name}
                          </Link>
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Modal for Image Zoom */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            position: 'relative',
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
            maxWidth: '90%',
            maxHeight: '90%',
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: 'absolute', top: 8, right: 8, color: '#fff', bgcolor: 'rgba(0,0,0,0.5)' }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={selectedImage}
            alt="Zoomed image"
            sx={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 1 }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Vehicles;
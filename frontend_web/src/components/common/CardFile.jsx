import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function CardFile({file}) {
    const handleImageClick = (file) => {
        setSelectedImage(file.url);
        setOpenModal(true);
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
    return (
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
    );
}

export default CardFile;
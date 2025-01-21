import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  Link,
  Paper,
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import SendIcon from '@mui/icons-material/Send';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useNavigate } from 'react-router-dom';

const SupportPage = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/dashboard/reservation");
  }

  return (
    <Box>
      <Paper elevation={3} 
        sx={{
                p: 4,
                bgcolor: '#fff5f0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
            }}
        >
        {/* Company Info */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography
            variant="h5"
            sx={{
                color: '#0088cc',
                fontWeight: 500,
                mb: 1,
            }}
            >
            CÔNG TY CỔ PHẦN CÔNG NGHỆ GRAC
            </Typography>
            
            <Typography
            variant="h6"
            sx={{
                color: '#0088cc',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                mb: 1,
            }}
            >
            <CallIcon /> HOTLINE: 1900 0340
            </Typography>

            <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: 2,
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon fontSize="small" />
                <Link href="mailto:Congnghe@grac.vn" underline="none">
                Congnghe@grac.vn
                </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LanguageIcon fontSize="small" />
                <Link href="https://grac.vn" target="_blank" underline="none">
                grac.vn
                </Link>
            </Box>
            </Box>
        </Box>

        {/* Message Input Card */}
        <Card
            sx={{
            width: '100%',
            maxWidth: 500,
            p: 3,
            border: '1px solid #26c6da',
            borderRadius: 2,
            }}
        >
            <Typography
            variant="h6"
            sx={{
                textAlign: 'center',
                mb: 2,
                fontStyle: 'italic'
            }}
            >
            Nhập nội dung cần hỗ trợ
            </Typography>
            <Typography
            sx={{
                textAlign: 'center',
                color: 'text.secondary',
                mb: 1,
                fontStyle: 'italic'
            }}
            >
            Hỗ trợ túi phân loại
            </Typography>
            <Typography
            sx={{
                textAlign: 'center',
                color: 'text.secondary',
                mb: 1,
                fontStyle: 'italic'
            }}
            >
            Hỗ trợ sự cố
            </Typography>
            <Typography
            sx={{
                textAlign: 'center',
                color: 'text.secondary',
                mb: 2,
            }}
            >
            .......
            </Typography>
            
            <TextField
            multiline
            rows={4}
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#26c6da',
                },
                '&:hover fieldset': {
                    borderColor: '#00bcd4',
                },
                },
            }}
            />
        </Card>

        {/* Send Button */}
        <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
            bgcolor: '#4caf50',
            px: 4,
            py: 1,
            borderRadius: 2,
            position: 'relative',
            '&:hover': {
                bgcolor: '#43a047',
            },
            }}
        >
            SEND
        </Button>

        {/* Schedule Button */}
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 500 }}>
            <Button
            variant="contained"
            onClick={handleNavigate}
            startIcon={<EventNoteIcon />}
            fullWidth
            sx={{
                bgcolor: '#26c6da',
                py: 1.5,
                borderRadius: 2,
                '&:hover': {
                bgcolor: '#00bcd4',
                },
            }}
            >
            ĐẶT LỊCH THU GOM
            </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SupportPage;
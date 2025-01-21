import { Box, Typography, Card, CardContent, Paper } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import ScaleIcon from '@mui/icons-material/Scale';

const CollectionDetailPage = () => {
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
            30.10.2024, 17:00
            </Box>

            <CardContent sx={{ pt: 4 }}>
            {/* Details List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AccessTimeIcon color="primary" />
                <Typography>
                    <strong>Thời gian thu gom:</strong> 16h ngày 31.10.2024
                </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <DeleteIcon color="primary" />
                <Typography>
                    <strong>Loại rác tái chế:</strong> Nhựa - PP
                </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <ScaleIcon color="primary" />
                <Typography>
                    <strong>Khối lượng:</strong> 300kg
                </Typography>
                </Box>
            </Box>

            {/* Images Container */}
            <Box
                sx={{
                display: 'flex',
                gap: 4,
                justifyContent: 'center',
                mt: 3
                }}
            >
                {[1, 2].map((index) => (
                <Box
                    key={index}
                    sx={{
                    width: 200,
                    height: 150,
                    bgcolor: '#e3f2fd',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #90caf9'
                    }}
                >
                    <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1
                    }}
                    >
                    <Box
                        sx={{
                        width: '60%',
                        height: '60%',
                        bgcolor: '#bbdefb',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}
                    >
                        <Box
                        sx={{
                            width: '40%',
                            height: '40%',
                            bgcolor: '#ffeb3b',
                            borderRadius: '50%'
                        }}
                        />
                    </Box>
                    <Box
                        sx={{
                        width: '80%',
                        height: '20%',
                        bgcolor: '#a5d6a7',
                        borderRadius: '8px 8px 0 0'
                        }}
                    />
                    </Box>
                </Box>
                ))}
            </Box>
            </CardContent>
        </Card>
      </Paper>
    </Box>
  );
};

export default CollectionDetailPage;
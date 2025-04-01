import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';

const Login = () => {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    navigate('/user');
  };

  const handle3rdPartyLogin = () => {
    navigate('/3rdparty');
  };

  return (
    <Container 
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'primary.main',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 400,
          width: '100%',
          backgroundColor: '#ffffff',
        }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 4
          }}
        >
          Decentralized Identity Management
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<PersonIcon />}
            onClick={handleUserLogin}
            sx={{
              py: 2,
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            User Login
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<BusinessIcon />}
            onClick={handle3rdPartyLogin}
            sx={{
              py: 2,
              backgroundColor: '#2e7d32',
              '&:hover': {
                backgroundColor: '#1b5e20',
              },
            }}
          >
            Third Party Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
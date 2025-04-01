import React, { useEffect,useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../utils/wallet.js';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography,
  Box,
  Paper,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
const UserProfile = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2",
      },
      background: {
        default:  "#f5f5f5",
        paper:  "#ffffff",
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
      h4: {
        fontWeight: 600,
        color: "#1976d2",
      },
      h6: {
        fontWeight: 500,
        color: "#333333",
      },
    },
  });

 
  const [userInfo,setUserInfo] = useState({});

  useEffect(()=>{
      fetchUser();
  },[]);

  const fetchUser = async()=>{
    const user = await getUserDetails();
    //console.log("user Details",user);
    setUserInfo(user);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          p: 4,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: "2rem"
        }}
      >
        <Paper
          elevation={6}
          sx={{
            maxWidth: 800,
            width: "100%",
            padding: 4,
            borderRadius: 3,
            background: `linear-gradient(145deg, 
              ${theme.palette.background.paper} 0%, 
              ${theme.palette.background.paper}ee 100%)`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease-in-out",
          }}
        >
          <Box sx={{ alignSelf: "flex-start"  }}>
          <IconButton 
            onClick={handleBack}
            sx={{ 
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{
              textAlign: "center",
              mb: 4,
              position: "relative",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: -8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 60,
                height: 3,
                backgroundColor: "primary.main",
                borderRadius: 1,
              },
            }}
          >
            User Profile
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "rgba(25,118,210,0.05)",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Typography variant="body2" sx={{ 
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                    <span style={{ fontWeight: 500 }}>Name:</span>
                    <span>{userInfo.name || "NaN"}</span>
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                    <span style={{ fontWeight: 500 }}>Email:</span>
                    <span>{userInfo.email || "NaN"}</span>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "rgba(25,118,210,0.05)",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Account Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Typography variant="body2" sx={{ 
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                    <span style={{ fontWeight: 500 }}>Role:</span>
                    <span>{userInfo.role || "NaN"}</span>
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                    <span style={{ fontWeight: 500 }}>Gender:</span>
                    <span>{userInfo.sex || "NaN"}</span>
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                    <span style={{ fontWeight: 500 }}>DOB:</span>
                    <span>{userInfo.dob || "NaN"}</span>
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                    <span style={{ fontWeight: 500 }}>Mobile:</span>
                    <span>{userInfo.mobile || "NaN"}</span>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default UserProfile;
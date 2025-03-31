import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  TextField,
} from "@mui/material";

const UserProfile = () => {
  const darkMode = false;

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#ff4081",
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
  });

  // State for user information
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "User",
  });

  // Handlers
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: darkMode ? "#303030" : "#f5f5f5",
          p: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            maxWidth: 800,
            margin: "0 auto",
            padding: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            User Profile
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              {isEditing ? (
                <>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <>
                  <Typography variant="body2">Name: {userInfo.name}</Typography>
                  <Typography variant="body2">Email: {userInfo.email}</Typography>
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Account Details
              </Typography>
              <Typography variant="body2">Role: {userInfo.role}</Typography>
              <Typography variant="body2">Status: Active</Typography>
              <Typography variant="body2">Member Since: Jan 2021</Typography>
              <Typography variant="body2">Last Login: Mar 28, 2025</Typography>
            </Grid>
          </Grid>

          <Box mt={4} display="flex" justifyContent="flex-end">
            {isEditing ? (
              <>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mr: 2 }}
                  onClick={() => setIsEditing(false)}
                >Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleSaveClick}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={handleEditClick}>
                Edit Profile
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default UserProfile;

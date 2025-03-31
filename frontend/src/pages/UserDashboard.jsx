import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import {UserProfile} from "./../components/UserProfile";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography,
  IconButton,
  Box,
  Button,
  Grid,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  AppBar,
  Toolbar,
  Modal,
  TextField,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
} from "@mui/icons-material";

function UserDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleUser = () => {
    navigate("/UserProfile");
  };
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
        <AppBar position="fixed" color="default" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              User Dashboard
            </Typography>
            <IconButton
              onClick={handleThemeToggle}
              sx={{
                border: "1px solid",
                borderColor: darkMode ? "white" : "black",
                borderRadius: 4,
                padding: "8px",
                backgroundColor: darkMode ? "#424242" : "#ffffff",
              }}
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ display: "flex", flexGrow: 1, mt: 8 }}>
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            sx={{
              [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
            }}
          >
            <Toolbar />
            <Box
              sx={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                "& > button": {
                  justifyContent: "flex-start",
                  width: "100%",
                },
              }}
            >
              <Button variant="text" onClick={handleUser}>Profile</Button>
              <Button variant="text">Logs</Button>
              <Button variant="text">Settings</Button>
            </Box>
          </Drawer>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              height: "100%",
              backgroundColor: darkMode ? "#303030" : "#f5f5f5",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6">Profile Overview</Typography>
                  <Typography variant="body2">Name: John Doe</Typography>
                  <Typography variant="body2">Role: User</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6">Recent Activity</Typography>
                  <Typography variant="body2">
                    - Logged in from new device
                  </Typography>
                  <Typography variant="body2">
                    - Updated profile picture
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box mt={4}>
              <Button variant="contained" color="primary">
                View More Details
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UserDashboard;

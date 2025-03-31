import React, { useState } from "react";
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
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
} from "@mui/icons-material";

function VerifierDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
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
              Verifier Dashboard
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
              <Button variant="text">Verify Credentials</Button>
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
                  <Typography variant="h6">Pending Verifications</Typography>
                  <Typography variant="body2">
                    - Credential #123: Awaiting action
                  </Typography>
                  <Typography variant="body2">
                    - Credential #124: In progress
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6">Verification Statistics</Typography>
                  <Typography variant="body2">- Total Verified: 50</Typography>
                  <Typography variant="body2">- Rejected: 5</Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box mt={4}>
              <Button variant="contained" color="primary">
                Start New Verification
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default VerifierDashboard;

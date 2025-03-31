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
  Modal,
  TextField,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
} from "@mui/icons-material";
function AddNewCredentialModal({ open, handleClose }) {
  const [credentialName, setCredentialName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Credential:", { credentialName, issuer, status });
    alert("Credential added successfully!");
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-credential-title"
      aria-describedby="add-credential-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          id="add-credential-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Add New Credential
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Credential Name"
                variant="outlined"
                fullWidth
                required
                value={credentialName}
                onChange={(e) => setCredentialName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Issuer"
                variant="outlined"
                fullWidth
                required
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                onClick={handleClose}
                variant="outlined"
                color="secondary"
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}

function IssuerDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
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
              Credential Dashboard
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
              <Button variant="text">Credentials</Button>
              <Button variant="text">Logs</Button>
              <Button variant="text">Access Control</Button>
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
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6">Credential 1</Typography>
                  <Typography variant="body2">
                    Issuer: Example Issuer
                  </Typography>
                  <Typography variant="body2">Status: Active</Typography>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Modify
                    </Button>
                    <Button variant="outlined" color="error" size="small">
                      Revoke
                    </Button>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6">Credential 2</Typography>
                  <Typography variant="body2">
                    Issuer: Another Issuer
                  </Typography>
                  <Typography variant="body2">Status: Revoked</Typography>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Modify
                    </Button>
                    <Button variant="outlined" color="error" size="small">
                      Revoke
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            <Box mt={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleModalOpen}
              >
                Add New Credential
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <AddNewCredentialModal open={modalOpen} handleClose={handleModalClose} />
    </ThemeProvider>
  );
}

export default IssuerDashboard;

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import WalletButton from "./components/WalletButton";
import { useNavigate } from "react-router-dom";
import { Popup } from "./components/3rParty";
function Login3rdparty() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openPopup, setOpenPopup] = useState(false); // Add this state
  const [isWaiting, setIsWaiting] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

  const handleWalletConnect = (account) => {
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("role", "user");
    localStorage.setItem("walletAddress", account);
    localStorage.setItem("awaitingResponse", "true");
    setIsWaiting(true);
    setOpenPopup(false);
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Open popup when login is clicked
  };
  useEffect(() => {
    if (isWaiting) {
      const checkInterval = setInterval(() => {
        const response = localStorage.getItem("verificationResponse");
        if (response) {
          setResponseStatus(response);
          setIsWaiting(false);
          localStorage.removeItem("verificationResponse");
          clearInterval(checkInterval);
        }
      }, 1000);
  
      return () => clearInterval(checkInterval);
    }
  }, [isWaiting]);
  const handlePopupClose = () => {
    setOpenPopup(false);
    setIsWaiting(false);
  };
  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "primary.main",
        color: "white",
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          backgroundColor: "#00FFFF",
          borderRadius: 4,
          minHeight: "50vh",
          width: "38vw",
          padding: 5,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Decentralized Identity Management
        </Typography>

        <TextField
          label="Username(Aadhaar number)"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />

        <Button
          onClick={handleLogin}
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#1976d2",
            color: "white",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Login
        </Button>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Stack spacing={2}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={handleLogin}
            sx={{
              backgroundColor: "white",
              color: "#757575",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Continue with Google
          </Button>

          <WalletButton onConnect={handleWalletConnect} disabled={isWaiting} />

          {isWaiting && (
            <Typography color="info.main" sx={{ textAlign: "center", mt: 1 }}>
              Awaiting response from verification...
            </Typography>
          )}
          {!isWaiting && responseStatus === "approved" && (
            <Typography
              color="success.main"
              sx={{ textAlign: "center", mt: 1 }}
            >
              Verification approved! Redirecting to dashboard...
            </Typography>
          )}
          {!isWaiting && responseStatus === "rejected" && (
            <Typography color="error.main" sx={{ textAlign: "center", mt: 1 }}>
              Verification rejected. Please try again.
            </Typography>
          )}
        </Stack>
      </Box>
      <Popup
        open={openPopup}
        onClose={handlePopupClose}
        websiteName="Third Party Website"
      />
    </Container>
  );
}

export default Login3rdparty;

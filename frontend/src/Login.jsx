import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import WalletButton from "./components/WalletButton";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const handleWalletConnect = (account) => {
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("role", "user");
    localStorage.setItem("walletAddress", account);
    navigate("/UserDashboard");
  };
  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("role", role);
    if (role === "user") {
      navigate("/UserDashboard");
    } else if (role === "issuer") {
      navigate("/IssuerDashboard");
    }
    else if(role === "verifier") {
      navigate("/VerifierDashboard");
    }
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
        sx={{
          backgroundColor: "#00FFFF",
          borderRadius: 4,
          width: "30vw",
          padding: 4,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Decentralized Identity Management
        </Typography>

        {/* Login with Username & Password */}
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              mb: 2,
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              mb: 2,
            }}
          />

          {/* Role Selection */}
          <Typography variant="subtitle1" align="left" sx={{ width: "100%", mb: 1 }}>
            Select Role:
          </Typography>
          <RadioGroup
            row
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{ mb: 2 }}
          >
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel value="issuer" control={<Radio />} label="Issuer" />
            <FormControlLabel value="verifier" control={<Radio />} label="Verifier" />
          </RadioGroup>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>

        {/* OR Divider */}
        <Divider
          sx={{
            width: "100%",
            my: 2,
            color: "white",
            "&::before, &::after": {
              borderColor: "white",
            },
          }}
        >
          OR
        </Divider>

        {/* Login with Google */}
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ width: "100%", mb: 2 }}
          onClick={handleLogin}
        >
          Login with Google
        </Button>

        {/* Login with Wallet */}
        <WalletButton onConnect={handleWalletConnect}/>
      </Box>
    </Container>
  );
}

export default Login;
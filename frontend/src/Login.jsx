import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
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
    if(account === "0xA428307EE5a4768904D41C660f26cD03D2b8e2cA".toLowerCase()){
      navigate("/IssuerDashboard");
    }else
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
          height: "35vh",
          width: "38vw",
          padding: 5,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", paddingBottom: 20 }}>
          Decentralized Identity Management
      </Typography>
        {/* Login with Wallet */}
        <WalletButton onConnect={handleWalletConnect}/>
      </Box>
    </Container>
  );
}

export default Login;
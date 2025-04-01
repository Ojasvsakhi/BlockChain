import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import WalletButton from "./components/WalletButton";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");

  const handleWalletConnect = (account) => {
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("role", "user");
    localStorage.setItem("walletAddress", account);
    //Const issuerAddress
    if (
      account === "0x93C6b9f263BC2437a1Ee9e42a7E85fB1473A9252".toLowerCase()
    ) {
      navigate("/IssuerDashboard");
    } else navigate("/UserDashboard");
  };
  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("role", role);
    if (role === "user") {
      navigate("/UserDashboard");
    } else if (role === "issuer") {
      navigate("/IssuerDashboard");
    } else if (role === "verifier") {
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
          backgroundColor: "#ffffff",
          borderRadius: 4,
          width: "35vw",
          padding: 5,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          display: "flex", // Add this
          flexDirection: "column", // Add this
          alignItems: "center", // Add this
        }}
      >
        <Typography 
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            paddingBottom: 10,
            textAlign: "center",
            color: 'primary.main' // Add this
          }}
        >
          Welcome User
        </Typography>
        {/* Login with Wallet */}
        <WalletButton onConnect={handleWalletConnect} />
      </Box>
    </Container>
  );
}

export default Login;

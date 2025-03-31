import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
  CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddDocumentDialog from "../components/AddDocument";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {getUserList} from "../utils/wallet.js"

const UserDashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const mockRequests = [];
  useEffect(() => {
    fetchRequests();
    window.onbeforeunload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    },[];

    // Add popstate event listener
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handleBackButton);

    // Cleanup function
    return () => {
      window.onbeforeunload = null;
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);
  const handleProfile = () => {
    navigate('/UserProfile');
  }
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const verificationList = await getUserList();
      // Set the state with the fetched list
      //setRequests(verificationList);
      setRequests((prev) => [...verificationList]);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("Updated Requests:", requests);
}, [requests]); // Runs whenever `requests` updates

  const handleAddDocument = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSubmitDocument = (formData) => {
    console.log('Submitted:', formData);
    setOpenDialog(false);
  };
  const handleBackButton = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      // Add your logout logic here
      navigate('/login'); // or wherever you want to redirect after logout
    } else {
      window.history.pushState(null, null, window.location.pathname);
    };
  };
  const getStatusChipProps = (status) => {
    switch (status) {
      case 'Approved':
        return { color: 'success', variant: 'filled' };
      case 'Pending':
        return { color: 'warning', variant: 'filled' };
      default:
        return { color: 'error', variant: 'filled' };
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <IconButton 
          color="primary" 
          size="large"
          onClick={handleProfile}
          sx={{ 
            '&:hover': { 
              backgroundColor: 'rgba(25, 118, 210, 0.04)'
            }
          }}
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <Typography variant="h4" component="h1" fontWeight="bold">
          My Documents
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddDocument}
        >
          Add Verification Request
        </Button>
      </Box>
  
      <Paper elevation={3}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : requests.length === 0 ? (
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <Typography color="text.secondary">
              No verification requests found
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Issuer</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request, index) => (
                  <TableRow 
                    key={request.documentId || `request-${index}`}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{request.issuerName}</TableCell>
                    <TableCell>
                      <Chip 
                        label={request.status}
                        size="small"
                        {...getStatusChipProps(request.status)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      <AddDocumentDialog 
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitDocument}
      />
    </Container>
  );
};

export default UserDashboard;
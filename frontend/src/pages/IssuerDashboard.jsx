import React, { useState, useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewDocument from '../components/ViewDocument';
import {getVerifierList} from "../utils/wallet.js"

const IssuerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Mock data - replace with your blockchain data
  const mockRequests = [];

  useEffect(() => {
    fetchRequests();
  },[]);

   const fetchRequests = async () => {
      try {
        setLoading(true);
        const verificationList = await getVerifierList();
        setRequests((prev) => [...verificationList]);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedRequest(null);
    setOpenDialog(false);
  };

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      setLoading(true);
      // Replace with your blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRequests(prev => 
        prev.map(req => 
          req.id === requestId ? { ...req, status: newStatus } : req
        )
      );
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusChipProps = (status) => {
    switch (status) {
      case 0:
        return { color: 'success', variant: 'filled' };
      case 1:
        return { color: 'error', variant: 'filled' };
      default:
        return { color: 'warning', variant: 'filled' };
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" mb={4}>
        Verification Requests
      </Typography>

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
                  <TableCell>Request ID</TableCell>
                  <TableCell>Wallet Address</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                  <TableCell>User</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.cid} hover>
                    <TableCell>{request.cid}</TableCell>
                    <TableCell>{request.metaIndex}</TableCell>
                    <TableCell>
                      <Chip 
                        label={request.status}
                        size="small"
                        {...getStatusChipProps(request.status)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleViewDetails(request)}
                        size="small"
                      >
                        View Details
                      </Button>
                    </TableCell>
                    <TableCell>{request.user}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <ViewDocument 
        open={openDialog}
        onClose={handleCloseDialog}
        selectedRequest={selectedRequest}
        onUpdateStatus={handleUpdateStatus}
      />
    </Container>
  );
};

export default IssuerDashboard;
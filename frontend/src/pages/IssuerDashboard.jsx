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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const IssuerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Mock data - replace with your blockchain data
  const mockRequests = [
    {
      id: "REQ001",
      address: "0x123...abc",
      status: "Pending",
      documentType: "Aadhar Card",
      documentId: "1234-5678-9012",
      additionalFields: [
        { label: "Name", value: "John Doe" },
        { label: "DOB", value: "1990-01-01" },
        { label: "Gender", value: "Male" }
      ]
    },
    {
      id: "REQ002",
      address: "0x456...def",
      status: "Approved",
      documentType: "PAN Card",
      documentId: "ABCDE1234F",
      additionalFields: [
        { label: "Name", value: "Jane Smith" },
        { label: "DOB", value: "1992-05-15" }
      ]
    }
  ];

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRequests(mockRequests);
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

  const getStatusChipProps = (status) => {
    switch (status) {
      case 'Approved':
        return { color: 'success', variant: 'filled' };
      case 'Rejected':
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
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id} hover>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.address}</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          Document Details
        </DialogTitle>
        <DialogContent dividers>
          {selectedRequest && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="subtitle2">Document Type</Typography>
              <Typography>{selectedRequest.documentType}</Typography>

              <Typography variant="subtitle2">Document ID</Typography>
              <Typography>{selectedRequest.documentId}</Typography>

              <Typography variant="subtitle2" sx={{ mt: 2 }}>Additional Information</Typography>
              {selectedRequest.additionalFields.map((field, index) => (
                <Box key={index}>
                  <Typography variant="subtitle2">{field.label}</Typography>
                  <Typography>{field.value}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default IssuerDashboard;